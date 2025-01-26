import { computedFields } from "@contentlayer/computed";
import { defineDocumentType } from "contentlayer2/source-files";

export const Lab = defineDocumentType(() => ({
  name: "Lab",
  filePathPattern: `labs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: false,
    },
    publishedAt: {
      type: "string",
      required: true,
    },
    toc: {
      type: "boolean",
      default: true,
      required: false,
    },
    sortOrder: {
      type: "number",
      required: false,
    },
    categories: {
      type: 'list',
      of: { type: 'string' },
    }
  },
  computedFields
}))