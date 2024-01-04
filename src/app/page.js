'use client'
import {useRef, useState} from "react";
import eventsToICS from "@/libs/calendar-converter/calendar-converter";

export default function Home() {

    const [timeTableInputFields, setTimeTableInputFields] = useState([
        {name: '', start: '', end: ''}
    ])

    const handleTimeTableFormChange = (index, event) => {
        let data = [...timeTableInputFields];
        data[index][event.target.name] = event.target.value;
        setTimeTableInputFields(data);
    }
    const addTimeTableFields = () => {
        let new_field = {name: '', start: '', end: ''};

        setTimeTableInputFields([...timeTableInputFields, new_field]);
    }

    const removeTimeTableFields = (index) => {
        let data = [...timeTableInputFields];
        data.splice(index, 1)
        setTimeTableInputFields(data)
    }

    const [calDataInputFields, setCalDataInputFields] = useState([
        {name: '', weeks: '', weekday: '', time_choice: '', teacher: '', location: '', remarks: ''}
    ])

    const handleCalDataFormChange = (index, event) => {
        let data = [...calDataInputFields];
        data[index][event.target.name] = event.target.value;
        setCalDataInputFields(data);
    }

    const addCalDataFields = () => {
        let new_field = {name: '', weeks: '', weekday: '', time_choice: '', teacher: '', location: '', remarks: ''}

        setCalDataInputFields([...calDataInputFields, new_field])
    }

    const removeCalDataFields = (index) => {
        let data = [...calDataInputFields];
        data.splice(index, 1)
        setCalDataInputFields(data)
    }

    const icsDataRef = useRef(null);
    const startDateRef = useRef(null);

    function handlePreview() {
        console.log("preview");

        let start_date = startDateRef.current.value;
        let time_table = {};

        for (let tt_index in timeTableInputFields) {
            if (timeTableInputFields[tt_index].name.length > 0) {
                time_table[timeTableInputFields[tt_index].name] = {
                    start: timeTableInputFields[tt_index].start,
                    end: timeTableInputFields[tt_index].end
                };
            }
        }
        icsDataRef.current.value = eventsToICS(start_date, time_table, calDataInputFields);
    }

    function handleDownload() {
        handlePreview()
        const blob = new Blob([icsDataRef.current.value], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'calendar.ics';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    }

    return (
        <main className="flex flex-col items-center justify-between p-24">
            <div className="w-2/3">
                <label htmlFor="start_date" className="block text-lg font-medium leading-6 text-gray-900">开始日期</label>
                <div className="mt-2">
                    <input id="start_date" name="start_date"
                           ref={startDateRef}
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                </div>
            </div>

            <div className="w-2/3">
                <label htmlFor="time_table" className="block text-lg font-medium leading-6 text-gray-900">时间表</label>
                {timeTableInputFields.map((input, index) => {
                    return (
                        <div key={index}>
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name='name'
                                placeholder='时间段名'
                                value={input.name}
                                onChange={event => handleTimeTableFormChange(index, event)}
                            />
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name='start'
                                placeholder='时间段起始时间'
                                value={input.start}
                                onChange={event => handleTimeTableFormChange(index, event)}
                            />
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name='end'
                                placeholder='时间段结束时间'
                                value={input.end}
                                onChange={event => handleTimeTableFormChange(index, event)}
                            />
                            <button
                                className="rounded-md bg-red-700 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400"
                                onClick={() => removeTimeTableFields(index)}>删除</button>
                        </div>
                    )
                })}
                <button
                    className="rounded-md bg-blue-500 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400"
                    onClick={addTimeTableFields}>添加</button>
            </div>

            <div className="w-2/3">
                <label htmlFor="cal_data" className="block text-lg font-medium leading-6 text-gray-900">课程表</label>
                {calDataInputFields.map((input, index) => {
                    return (
                        <div key={index}>
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name='name'
                                placeholder='课程名'
                                value={input.name}
                                onChange={event => handleCalDataFormChange(index, event)}
                            />
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name='weeks'
                                placeholder='周次'
                                value={input.weeks}
                                onChange={event => handleCalDataFormChange(index, event)}
                            />
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name='weekday'
                                placeholder='星期几'
                                value={input.weekday}
                                onChange={event => handleCalDataFormChange(index, event)}
                            />
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name='time_choice'
                                placeholder='时间段'
                                value={input.time_choice}
                                onChange={event => handleCalDataFormChange(index, event)}
                            />
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name='teacher'
                                placeholder='任课老师'
                                value={input.teacher}
                                onChange={event => handleCalDataFormChange(index, event)}
                            />
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name='location'
                                placeholder='地点'
                                value={input.location}
                                onChange={event => handleCalDataFormChange(index, event)}
                            />
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name='remarks'
                                placeholder='备注'
                                value={input.remarks}
                                onChange={event => handleCalDataFormChange(index, event)}
                            />
                            <button
                                className="rounded-md bg-red-700 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400"
                                onClick={() => removeCalDataFields(index)}>删除</button>
                        </div>
                    )
                })}
                <button
                    className="rounded-md bg-blue-500 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400"
                    onClick={addCalDataFields}>添加</button>
            </div>

            <button type="button"
                    onClick={handlePreview}
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                预览
            </button>

            <div className="w-2/3">
                <label htmlFor="ics_data" className="block text-sm font-medium leading-6 text-gray-900">ICS
                    预览
                </label>
                <div className="mt-2">
                    <textarea id="ics_data" name="ics_data" rows="3"
                              ref={icsDataRef}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
            </div>

            <button type="button"
                    onClick={handleDownload}
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm mt-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                下载
            </button>
        </main>
    )
}
