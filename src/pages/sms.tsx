import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/utils/api"
import { useState } from "react"

export default function Page() {
  const [phone, setPhone] = useState("")
  const {mutate} = api.sms.sendSms.useMutation()

  return (
    <>
      <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Button onClick={() => mutate({
        formId: 4,
        phone
      })}>Send SMS</Button>
    </>
  )
}