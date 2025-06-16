import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

async function getWaitlistEmails() {
  try {
    // In a production app, you would fetch this from your API
    // with proper authentication
    const fs = require("fs/promises")
    const path = require("path")

    const filePath = path.join(process.cwd(), "data", "waitlist-emails.json")

    try {
      const fileContent = await fs.readFile(filePath, "utf8")
      return JSON.parse(fileContent)
    } catch (err) {
      console.error("Error reading waitlist emails file:", err)
      return []
    }
  } catch (error) {
    console.error("Error getting waitlist emails:", error)
    return []
  }
}

async function WaitlistTable() {
  const emails = await getWaitlistEmails()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Source</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {emails.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No emails yet
            </TableCell>
          </TableRow>
        ) : (
          emails.map((entry: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{entry.email}</TableCell>
              <TableCell>{new Date(entry.timestamp).toLocaleString()}</TableCell>
              <TableCell>{entry.source}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

export default function WaitlistPage() {
  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Waitlist Emails</CardTitle>
          <CardDescription>All emails collected from the waitlist form</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <WaitlistTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
