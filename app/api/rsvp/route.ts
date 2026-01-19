import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const res = await fetch(
            process.env.POWER_AUTOMATE_URL!,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: body.name,
                    participants: Number(body.participants),
                    note: body.note || "",
                }),
            }
        )

        if (!res.ok) {
            const text = await res.text()
            return NextResponse.json(
                { error: text },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        )
    }
}
