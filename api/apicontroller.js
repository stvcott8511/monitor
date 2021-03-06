const _ = require("lodash");
const MonitorController = require(__dirname + "/controllers/MonitorController");
const Eventcontroller = require(__dirname + "/controllers/Eventcontroller");
const LogManager = require(__dirname + "/logging/LogManager").LogManager;
const QueueManager = require(__dirname + "/queue/QueueManager");

var logger = LogManager.getLogger();
var monController = new MonitorController(logger);
var eventController = new Eventcontroller(logger);
var queue = QueueManager("Defualt", logger);

class EventWapper {
    constructor(eventController, monController, queue, logger) {
        this.eventController = eventController;
        this.monController = monController;
        this.queue = queue;
        this.logger = logger;
    }
    async add(event) {
        // Check to see if monitor is in collection.
        // if yes, then add event and put alert on q.
        let result;
        if (_.isUndefined(_.get(event, "linkedMon"))) {
            let error = new Error("Event must have linkedMon property.");
            this.logger.log(error);
            throw error;
        }
        let monitor = await this.monController.findMonitor({
            monName: event.linkedMon
        });
        if (monitor.length == 1) {
            result = await this.eventController.addEvent(event);
            await this.queue.push(event);
        } else {
            let error = new Error("No monitor for given event. Added event must have a monitor.");
            this.logger.log(error);
            throw error;
        }
        return result;
    }
}

class MonitorWapper {
    constructor(eventController, monController, logger) {
        this.eventController = eventController;
        this.monController = monController;
        this.logger = logger;
    }

    async removeMonitor(monitor) {
        let result = await this.eventController.removeEventsByMonitor(monitor);
        let result2 = await this.monController.removeMonitor(monitor);
        return [result, result2];
    }
}

let eventWapper = new EventWapper(eventController, monController, queue, logger);
let monitorWapper = new MonitorWapper(eventController, monController, logger);

let api = {
    addMonitor: function (monitor) {
        return monController.addMonitor(monitor);
    },
    removeMonitor: function (monitor) {
        return monitorWapper.removeMonitor(monitor);
    },
    findMonitor: function (monitor) {
        return monController.findMonitor(monitor);
    },
    addEvent: function (event) {
        return eventWapper.add(event);
    },
    findEvent: function (event) {
        return eventController.findEvent(event);
    }
}

module.exports = api;