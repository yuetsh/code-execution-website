export const cSource =
    `#include<stdio.h>

int main()
{
    printf("Hello World!");
    return 0;
}`

export const cppSource =
    `#include<iostream>

using namespace std;

int main()
{
    cout<<"Hello World!"<<endl;
    return 0;
}`

export const javaSource =
    `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`

export const pythonSource = `print("Hello World!")`;

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
        sourceBase64: "I2luY2x1ZGU8c3RkaW8uaD4KCmludCBtYWluKCkKewogICAgcHJpbnRmKCJIZWxsbyBXb3JsZCEiKTsKICAgIHJldHVybiAwOwp9",
        result: {
            status: { id: 3, msg: "Accepted, 4ms, 1MB" },
            output: "Hello World!"
        }
    },
    54: {
        sourceBase64: "I2luY2x1ZGU8aW9zdHJlYW0+Cgp1c2luZyBuYW1lc3BhY2Ugc3RkOwoKaW50IG1haW4oKQp7CiAgICBjb3V0PDwiSGVsbG8gV29ybGQhIjw8ZW5kbDsKICAgIHJldHVybiAwOwp9",
        result: {
            status: { id: 3, msg: "Accepted, 5ms, 1MB" },
            output: "Hello World!"
        }
    },
    62: {
        sourceBase64: "cHVibGljIGNsYXNzIE1haW4gewogICAgcHVibGljIHN0YXRpYyB2b2lkIG1haW4oU3RyaW5nW10gYXJncykgewogICAgICAgIFN5c3RlbS5vdXQucHJpbnRsbigiSGVsbG8gV29ybGQhIik7CiAgICB9Cn0=",
        result: {
            status: { id: 3, msg: "Accepted, 48ms, 10MB" },
            output: "Hello World!"
        }
    },
    71: {
        sourceBase64: "cHJpbnQoIkhlbGxvIFdvcmxkISIp",
        result: {
            status: { id: 3, msg: "Accepted, 18ms, 3MB" },
            output: "Hello World!"
        }
    },
}