import {NextResponse} from "next/server";
import {eventsToICS} from "@/libs/calendar-converter/calendar-converter";

export async function POST(request) {
    const calData = await request.json();
    const value = eventsToICS(calData['start_date'], calData['time_table'], calData['cal_data']);
    return new NextResponse(value);
}

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const calData = eval("(" + searchParams.get('calData') + ")");
    const value = eventsToICS(calData['start_date'], calData['time_table'], calData['cal_data']);
    return new NextResponse(value);
}
