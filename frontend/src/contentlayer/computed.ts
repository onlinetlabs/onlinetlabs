import { ComputedFields } from "contentlayer2/source-files"

export const computedFields: ComputedFields = {
  id: {
    type: "string",
    resolve: (doc) => {
      return doc._raw.flattenedPath.split("/").slice(1).join("/")
    },
  },
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  namespace: {
    type: "string",
    resolve: (doc) => {
      return doc._raw.sourceFileDir.split("/").pop()
    },
  },
  isEntryPage: {
    type: "boolean",
    resolve: (doc) => doc._raw.sourceFileName === "index.mdx",
  },
}
