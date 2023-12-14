import {NextResponse} from "next/server";
import {eventsToICS} from "@/libs/calendar-converter/calendar-converter";

export async function POST(request) {
    const res = await request.json();
    const value = eventsToICS(res['start_date'], res['time_table'], res['cal_data']);
    return new NextResponse(value);
}
