#!/usr/local/bin node

const  mockdata = {
    data: "默默",
    result: {
        title: "我是一只小菜鸟"
    }
}

const json2ts = require("json2ts");
const jsonContent = JSON.stringify(mockdata);
const result = json2ts.convert(jsonContent);
console.log(result)