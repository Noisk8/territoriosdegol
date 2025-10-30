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

export const audioTracks: AudioTrack[] = [
  {
    title: 'El día que Medellín desafió al Rey',
    description: 'Relato sobre la visita del Santos de Brasil y Pelé a Medellín (1960).',
    src: '/eldiaque.m4a',
    cover: '/blog/Pele.jpeg',
    tags: ['Medellín', 'Pelé']
  },
  {
    title: 'Uniforme de Niña',
    description: 'Una memoria íntima alrededor del fútbol, la familia y el barrio Belén.',
    src: '/uniformedenina.m4a',
    cover: '/blog/uni_nina-1.jpeg',
    tags: ['Memoria', 'Medellín']
  },
  {
    title: 'Mi primer',
    description: 'Testimonio sonoro sobre el vínculo personal con el fútbol.',
    src: '/miprimer.m4a',
    cover: '/og.jpg',
    tags: ['Recuerdo']
  }
]

