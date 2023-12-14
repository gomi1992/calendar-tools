Calendar Tools,generate ICS by given data structure.

## 首次使用

安装依赖
```bash
yarn install
```

运行
```bash
yarn dev
```

编译
运行
```bash
yarn build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 界面模式

默认URL: http://127.0.0.1:3000/

填写第一周第一天的日期，时间表，课程表。

第一周第一天的日期：作为基准，用于往后周次的计算,示例："2023-09-04"。

时间表：json格式。每日课程的上课起止时间，如第一节课8：20上，9：05下；也可以写两节课的时间，如，一二节课8：20上，10：00下。 示例
```json
{
    "1-2": {
        "start": "08:20",
        "end": "10:00"
    },
    "3-4": {
        "start": "10:20",
        "end": "12:00"
    },
    "5-6": {
        "start": "14:00",
        "end": "15:40"
    },
    "7-8": {
        "start": "15:50",
        "end": "17:30"
    }
}
```

课程表：json格式。周次用','分割，支持连续周次，如1-8,10；周几用1-7指代星期一到星期日。示例
```json
[
    {
        "name": "[410802045]人机交互",
        "weeks": "1-8,10",
        "weekday": "5",
        "time_choice": "1-2",
        "teacher": "[15108121]XXX",
        "location": "教学楼1-202",
        "remarks": "想去就去"
    }
]
```

## API模式

URL（POST）: http://127.0.0.1:3000/api/gen_calendar

示例数据（数据格式参考上一小节）：
```json
{
    "start_date": "2023-09-04",
    "time_table": {
        "1-2": {
            "start": "08:20",
            "end": "10:00"
        },
        "3-4": {
            "start": "10:20",
            "end": "12:00"
        },
        "5-6": {
            "start": "14:00",
            "end": "15:40"
        },
        "7-8": {
            "start": "15:50",
            "end": "17:30"
        }
    },
    "cal_data": [
        {
            "name": "[410802045]人机交互",
            "weeks": "1-8,10",
            "weekday": "5",
            "time_choice": "1-2",
            "teacher": "[15108121]XXX",
            "location": "教学楼1-202",
            "remarks": "想去就去"
        }
    ]
}
```

## 静态部署到github

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
