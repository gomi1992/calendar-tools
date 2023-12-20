'use client'
import eventsToICS from "@/libs/calendar-converter/calendar-converter";
import {useRef, useState} from "react";

export default function Home() {

    const [icsData, setIcsData] = useState("");

    const icsDataRef = useRef(null);
    const startDateRef = useRef(null);
    const timeTableRef = useRef(null);
    const calDataRef = useRef(null);

    function handlePreview() {
        console.log("preview");

        let start_date = startDateRef.current.value;
        let time_table = eval("(" + timeTableRef.current.value + ")");
        let cal_data = eval("(" + calDataRef.current.value + ")");

        icsDataRef.current.value = eventsToICS(start_date, time_table, cal_data);

    }

    function handleDownload() {
        const blob = new Blob([icsData], {type: 'text/plain'});
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
                <label htmlFor="start_date" className="block text-sm font-medium leading-6 text-gray-900">Start
                    Date</label>
                <div className="mt-2">
                    <textarea id="start_date" name="start_date" rows="3"
                              ref={startDateRef}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <div className="w-2/3">
                <label htmlFor="time_table" className="block text-sm font-medium leading-6 text-gray-900">Time
                    Table</label>
                <div className="mt-2">
                    <textarea id="time_table" name="time_table" rows="3"
                              ref={timeTableRef}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <div className="w-2/3">
                <label htmlFor="cal_data" className="block text-sm font-medium leading-6 text-gray-900">Calendar
                    Data</label>
                <div className="mt-2">
                    <textarea id="cal_data" name="cal_data" rows="3"
                              ref={calDataRef}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <button type="button"
                    onClick={handlePreview}
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Preview
            </button>

            <div className="w-2/3">
                <label htmlFor="ics_data" className="block text-sm font-medium leading-6 text-gray-900">ICS
                    Preview</label>
                <div className="mt-2">
                    <textarea id="ics_data" name="ics_data" rows="3"
                              ref={icsDataRef}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <button type="button"
                    onClick={handleDownload}
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Download
            </button>
        </main>
    )
}
