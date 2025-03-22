import { computedFields } from "@contentlayer/computed";
import { defineDocumentType } from "contentlayer2/source-files";

export const Course = defineDocumentType(() => ({
  name: "Course",
  filePathPattern: `courses/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
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
      required: true,
    },
  },
  computedFields,
}))