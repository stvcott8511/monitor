# Visual Studio Code Configurations

If your primary code editor is Visual Studio Code, the following are some useful configurations.

## `tasks.json`

```json
{
    "tasks": [
        {
            "type": "npm",
            "script": "build:dev",
            "group": "build",
            "problemMatcher": []
        }
    ]
}
```

## `launch.json`

```json
{
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/server.ts",
            "preLaunchTask": "npm: build:dev",
            "outFiles": [
                "${workspaceFolder}/build/**/*.js"
            ]
        }
    ]
}
```