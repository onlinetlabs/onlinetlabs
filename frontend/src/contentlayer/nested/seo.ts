import { defineNestedType } from "contentlayer2/source-files"

export const seo = defineNestedType(() => ({
  name: 'SEO',
  fields: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    imagePath: {
      type: 'string',
      required: true,
    },
  },
  extensions: {},
}))