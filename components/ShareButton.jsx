'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Share2, Link as LinkIcon, Facebook, Twitter } from 'lucide-react'

export default function ShareButton({ shareUrl }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Compartir</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Compartir esta entrada</h4>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              <input
                className="flex-grow p-2 text-sm border rounded"
                value={shareUrl}
                readOnly
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
              >
                {isCopied ? 'Copiado' : 'Copiar'}
              </Button>
            </div>
            <div className="flex justify-start gap-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}>
                <Facebook className="mr-2 h-4 w-4" /> Facebook
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, '_blank')}>
                <Twitter className="mr-2 h-4 w-4" /> Twitter
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}