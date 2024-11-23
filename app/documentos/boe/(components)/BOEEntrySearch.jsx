'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

export default function BOEEntrySearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    router.push(`/boe?search=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <Input
        type="text"
        placeholder="Buscar por título o código BOE"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
    </form>
  )
}