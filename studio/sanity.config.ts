import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {muxInput} from 'sanity-plugin-mux-input'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'kcdc.fun',
  projectId: 'm6tfkaqi',
  dataset: 'production',

  plugins: [
    structureTool(),
    muxInput({
      mp4_support: 'standard',
    }),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
