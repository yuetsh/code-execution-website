export const cSource =
  '#include<stdio.h>\r\n\r\nint main()\r\n{\r\n    printf("黄岩一职");\r\n    return 0;\r\n}'
export const cppSource =
  '#include<iostream>\r\n\r\nusing namespace std;\r\n\r\nint main()\r\n{\r\n    cout<<"黄岩一职"<<endl;\r\n    return 0;\r\n}'
export const pythonSource = 'print("黄岩一职")'
export const javaSource =
  'public class Main {\r\n    public static void main(String[] args) {\r\n        System.out.println("黄岩一职");\r\n    }\r\n}'

export const sources = {
  50: cSource,
  54: cppSource,
  62: javaSource,
  71: pythonSource,
}

export const language = {
  50: "c",
  54: "cpp",
  62: "java",
  71: "python",
}

export const deadResults = {
  50: {
    encoded:
      "I2luY2x1ZGU8c3RkaW8uaD4NCg0KaW50IG1haW4oKQ0Kew0KICAgIHByaW50Zigi6buE5bKp5LiA6IGMIik7DQogICAgcmV0dXJuIDA7DQp9",
    result: {
      status: 3,
      output: "黄岩一职",
    },
  },
  54: {
    encoded:
      "I2luY2x1ZGU8aW9zdHJlYW0+DQoNCnVzaW5nIG5hbWVzcGFjZSBzdGQ7DQoNCmludCBtYWluKCkNCnsNCiAgICBjb3V0PDwi6buE5bKp5LiA6IGMIjw8ZW5kbDsNCiAgICByZXR1cm4gMDsNCn0=",
    result: {
      status: 3,
      output: "黄岩一职",
    },
  },
  71: {
    encoded: "cHJpbnQoIum7hOWyqeS4gOiBjCIp",
    result: {
      status: 3,
      output: "黄岩一职",
    },
  },
  62: {
    encoded:
      "cHVibGljIGNsYXNzIE1haW4gew0KICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBtYWluKFN0cmluZ1tdIGFyZ3MpIHsNCiAgICAgICAgU3lzdGVtLm91dC5wcmludGxuKCLpu4TlsqnkuIDogYwiKTsNCiAgICB9DQp9",
    result: {
      status: 3,
      output: "黄岩一职",
    },
  },
}

export const CJN = {
  1: `#入园检测\na=input()\n#请大家将以下代码用if结构组合在一起。\n\n a=='有票'                      #如果有票\n\tprint("可以入园")`,
  2: `#变量a为年龄\nnianling=int(input())\n#请大家将以下代码用if结构组合在一起。\n nianling>=60\t#如果年龄大于等于60\n\tprint('敬老票')\n\t\t\t\t#否则\n\tprint('成人票')`,
  3: `#变量a为年龄\nnianling=int(input())\n#请大家将以下代码用if结构组合在一起。\n nianling<12\t\t#如果年龄小于12\n\tprint('温馨之旅')\n\t\t\t\t\t#否则\n\tprint('惊险之旅')`,
}
