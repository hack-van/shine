// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { api } from "@/utils/api"
// import { useState } from "react"

// export default function Page() {
//   const [id, setId] = useState(4)
//   const [phone, setPhone] = useState("")
//   const {mutate} = api.sms.sendSms.useMutation()

//   return (
//     <>
//       <Input placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
//       <Input placeholder="form-id" value={id} onChange={(e) => setId(+e.target.value)} />
//       <Button onClick={() => mutate({
//         formId: id,
//         phone
//       })}>Send SMS</Button>
//     </>
//   )
// }
