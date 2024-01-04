import moment from 'moment-timezone';
import * as ics from "ics";

function weeksToWeekList(weeks) {
    let s1 = weeks.split(',');
    let result = [];
    for (let item in s1) {
        if (s1[item].includes('-')) {
            let s2 = s1[item].split('-');
            for (let i = parseInt(s2[0]); i <= parseInt(s2[1]); i++) {
                result.push(i);
            }
        } else {
            result.push(parseInt(s1[item]));
        }
    }
    return result;
}

function calToEventList(start_date_str, time_table, cal_data) {
    let event_items = [];
    let start_date = new Date(start_date_str);
    for (let cal_index in cal_data) {
        let cal_item = cal_data[cal_index];
        let weeks = weeksToWeekList(cal_item['weeks']);
        let weekday = parseInt(cal_item['weekday']);
        let time = time_table[cal_item['time_choice']];

        for (let week_index in weeks) {
            let week = weeks[week_index];
            let event_date = new Date(start_date);
            event_date.setDate(event_date.getDate() + (week - 1) * 7 + (weekday - 1));
            const tmp = event_date.getFullYear() + '-' + (event_date.getMonth() + 1).toString().padStart(2, 0) + '-' + event_date.getDate().toString().padStart(2, 0) + ' ';
            let start = moment.tz(tmp + time['start'], 'Asia/Shanghai').utc().format('YYYY-M-D-H-m').split("-").map(val => parseInt(val));
            let end = moment.tz(tmp + time['end'], 'Asia/Shanghai').utc().format('YYYY-M-D-H-m').split("-").map(val => parseInt(val));
            let event_item = {
                'title': cal_item['name'],
                // 'date': event_date,
                // 'time': time,
                'start': start,
                'end': end,
                'teacher': cal_item['teacher'],
                'location': cal_item['location'],
                'remarks': cal_item['remarks']
            };
            event_items.push(event_item);
        }
    }
    return event_items;
}

export function eventsToICS(startDateStr, timeTable, calData) {
    let event_list = calToEventList(startDateStr, timeTable, calData);
    let alarms = [];
    alarms.push({
        action: 'audio',
        description: 'Reminder',
        trigger: {minutes: 20, before: true},
        repeat: 2,
        attachType: 'VALUE=URI',
        attach: 'Glass'
    });
    let events = [];
    for (let event_index in event_list) {
        let event_item = event_list[event_index];
        let description = event_item['title'] + ' ' + event_item['teacher'] + ' ' + event_item['location'] + ' ' + event_item['remarks'];
        let event = {
            'startInputType': 'utc',
            'endInputType': 'utc',
            'start': event_item['start'],
            'end': event_item['end'],
            'title': event_item['title'],
            'description': description,
            'alarms': alarms
        };
        events.push(event);
    }
    const {error, value} = ics.createEvents(events);
    return value;
}

export default eventsToICS;
