import fs from 'node:fs'
import path from 'node:path'

// Audio tracks configuration
// ------------
// Description: Central list of audio stories available in the site.

export interface AudioTrack {
  title: string
  description?: string
  src: string
  cover?: string
  tags?: string[]
  author?: string
}

const AUDIO_DIR = path.resolve('public', 'fotos_audios')
const AUDIO_EXTENSIONS = new Set(['.mp3', '.m4a', '.wav'])
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp'])

const sanitize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

const formatTitle = (value: string) =>
  value
    .replace(/\.[^/.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())

const buildTracks = (): AudioTrack[] => {
  if (!fs.existsSync(AUDIO_DIR)) return []

  const files = fs.readdirSync(AUDIO_DIR)
  const audioFiles = files.filter((file) => AUDIO_EXTENSIONS.has(path.extname(file).toLowerCase()))
  const imageFiles = files.filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))

  const findCover = (audioBase: string) => {
    const audioSanitized = sanitize(audioBase)
    return imageFiles.find((image) => {
      const imageBase = image.replace(/\.[^/.]+$/, '')
      const imageSanitized = sanitize(imageBase)
      return (
        imageSanitized === audioSanitized ||
        imageSanitized.startsWith(audioSanitized) ||
        audioSanitized.startsWith(imageSanitized)
      )
    })
  }

  return audioFiles
    .map((file) => {
      const baseName = file.replace(/\.[^/.]+$/, '')
      const cover = findCover(baseName)
      return {
        title: formatTitle(baseName),
        src: `/fotos_audios/${file}`,
        cover: cover ? `/fotos_audios/${cover}` : undefined
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}

export const audioTracks: AudioTrack[] = buildTracks()
