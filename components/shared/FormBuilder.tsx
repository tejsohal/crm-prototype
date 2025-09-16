"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

import type { CustomForm, CustomField } from "@/lib/types"

type Props = {
  forms: CustomForm[]
  setForms: (forms: CustomForm[]) => void
}

export function FormBuilder({ forms, setForms }: Props) {
  const [formName, setFormName] = useState("Referral")
  const [fieldLabel, setFieldLabel] = useState("")
  const [fieldType, setFieldType] = useState<CustomField["type"]>("text")

  const addForm = () => {
    if (!forms.find((f) => f.name === formName)) {
      setForms([...forms, { name: formName, fields: [] }])
    }
  }

  const addField = () => {
    if (!fieldLabel) return
    setForms(
      forms.map((f) =>
        f.name === formName
          ? {
              ...f,
              fields: [
                ...f.fields,
                { id: Date.now().toString(), label: fieldLabel, type: fieldType },
              ],
            }
          : f
      )
    )
    setFieldLabel("")
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Form Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Form name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
          <Button variant="outline" onClick={addForm}>
            Add Form
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Field label"
            value={fieldLabel}
            onChange={(e) => setFieldLabel(e.target.value)}
          />
          <Select onValueChange={(v) => setFieldType(v as CustomField["type"])} defaultValue="text">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="textarea">Textarea</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="select">Select</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addField}>Add Field</Button>
        </div>

        <div>
          {forms.map((f) => (
            <div key={f.name} className="mt-3">
              <h4 className="font-medium">{f.name}</h4>
              <ul className="list-disc ml-6 text-xs text-zinc-600">
                {f.fields.map((fld) => (
                  <li key={fld.id}>
                    {fld.label} ({fld.type})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
