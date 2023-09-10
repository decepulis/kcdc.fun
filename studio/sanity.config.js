// sanity.config.js
import { defineConfig } from "sanity";

import schemas from './schemas'

import { deskTool } from 'sanity/desk'
import { muxInput } from 'sanity-plugin-mux-input'
import { media } from 'sanity-plugin-media'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  title: "kcdc.fun",
  "projectId": "m6tfkaqi",
  "dataset": "production",
  plugins: [
    deskTool(),
    muxInput(),
    media(),
    visionTool()
  ],
  schema: {
    types: schemas,
  },
});