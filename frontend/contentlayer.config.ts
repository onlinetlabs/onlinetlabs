import { getHighlighter } from "@shikijs/compat"
import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer2/source-files"
import rehypeAutolinkHeadings, { Options as RehypeAutolinkHeadingsOptions } from "rehype-autolink-headings"
import rehypePrettyCode, { Options as RehypePrettyCodeOptions } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { codeImport } from "remark-code-import"
import remarkGfm from "remark-gfm"
import { visit } from "unist-util-visit"

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  namespace: {
    type: 'string',
    resolve: (doc) => {
      return doc._raw.sourceFileDir.split('/').pop()
    }
  }
}

export const Chapter = defineDocumentType(() => ({
  name: "Chapter",
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
      type: 'number',
      required: true,
    }
  },
  computedFields,
}))

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
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./src/content",
  documentTypes: [Chapter, Lab],
  mdx: {
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [
      rehypeSlug,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children
            if (codeEl.tagName !== "code") {
              return
            }

            node.__rawString__ = codeEl.children?.[0].value
            node.__src__ = node.properties?.__src__
            node.__style__ = node.properties?.__style__
          }
        })
      },
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          getHighlighter: getHighlighter as unknown as RehypePrettyCodeOptions['getHighlighter'],
          grid: false,
          keepBackground: false,
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }]
            }
          },
        } as RehypePrettyCodeOptions,
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "figure") {
            if (!("data-rehype-pretty-code-figure" in node.properties)) {
              return
            }

            const preElement = node.children.at(-1)
            if (preElement.tagName !== "pre") {
              return
            }

            preElement.properties["__withMeta__"] = Object.hasOwn(node.children.at(0).properties, 'data-rehype-pretty-code-title')

            preElement.properties["__rawString__"] = node.__rawString__
          }
        })
      },
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
            "data-rehype-autolink-heading": ""
          },
        } as RehypeAutolinkHeadingsOptions,
      ],
    ],
  },
})
