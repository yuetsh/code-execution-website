export const cSource = '#include<stdio.h>\r\n\r\nint main()\r\n{\r\n    printf("黄岩一职");\r\n    return 0;\r\n}'
export const cppSource = '#include<iostream>\r\n\r\nusing namespace std;\r\n\r\nint main()\r\n{\r\n    cout<<"黄岩一职"<<endl;\r\n    return 0;\r\n}'
export const pythonSource = 'print("黄岩一职")'
export const javaSource = 'public class Main {\r\n    public static void main(String[] args) {\r\n        System.out.println("黄岩一职");\r\n    }\r\n}'

export const sources = {
    50: cSource,
    54: cppSource,
    62: javaSource,
    71: pythonSource
}

export const language = {
    50: "c",
    54: "cpp",
    62: "java",
    71: "python"
}

export const filename = {
    50: "main.c",
    54: "main.cpp",
    62: "Main.java",
    71: "script.py"
}

export const submissionBase64 = {
    50: {
        sourceBase64: "I2luY2x1ZGU8c3RkaW8uaD4NCg0KaW50IG1haW4oKQ0Kew0KICAgIHByaW50Zigi6buE5bKp5LiA6IGMIik7DQogICAgcmV0dXJuIDA7DQp9",
        result: {
            status: { id: 3, msg: "Accepted, 4ms, 1MB" },
            output: "黄岩一职"
        }
    },
    54: {
        sourceBase64: "I2luY2x1ZGU8aW9zdHJlYW0+DQoNCnVzaW5nIG5hbWVzcGFjZSBzdGQ7DQoNCmludCBtYWluKCkNCnsNCiAgICBjb3V0PDwi6buE5bKp5LiA6IGMIjw8ZW5kbDsNCiAgICByZXR1cm4gMDsNCn0=",
        result: {
            status: { id: 3, msg: "Accepted, 5ms, 1MB" },
            output: "黄岩一职"
        }
    },
    71: {
        sourceBase64: "cHJpbnQoIum7hOWyqeS4gOiBjCIp",
        result: {
            status: { id: 3, msg: "Accepted, 18ms, 3MB" },
            output: "黄岩一职"
        }
    },
    62: {
        sourceBase64: "cHVibGljIGNsYXNzIE1haW4gew0KICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBtYWluKFN0cmluZ1tdIGFyZ3MpIHsNCiAgICAgICAgU3lzdGVtLm91dC5wcmludGxuKCLpu4TlsqnkuIDogYwiKTsNCiAgICB9DQp9",
        result: {
            status: { id: 3, msg: "Accepted, 48ms, 10MB" },
            output: "黄岩一职"
        }
    },
}