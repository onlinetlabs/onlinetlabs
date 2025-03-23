import { getHighlighter } from "@shikijs/compat"
import rehypeAutolinkHeadings, {
  Options as RehypeAutolinkHeadingsOptions,
} from "rehype-autolink-headings"
import rehypePrettyCode, {
  Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { codeImport } from "remark-code-import"
import remarkGfm from "remark-gfm"
import { Pluggable } from "unified"
import { visit } from "unist-util-visit"

import rehypeMermaid from "./rehype-mermaid"

const prettyCodeOptions: RehypePrettyCodeOptions = {
  theme: "github-dark",
  getHighlighter:
    getHighlighter as unknown as RehypePrettyCodeOptions["getHighlighter"],
  grid: false,
  keepBackground: false,
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
  },
}

const autolinkHeadingsOptions: RehypeAutolinkHeadingsOptions = {
  behavior: "wrap",
  properties: {
    className: ["subheading-anchor"],
    ariaLabel: "Link to section",
    "data-rehype-autolink-heading": "",
  },
}

export const remarkPlugins = [remarkGfm, codeImport]

export const rehypePlugins: Pluggable[] = [
  [
    rehypeMermaid,
    {
      background: "transparent",
      className: "mermaid-diagram",
    },
  ],
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
  [rehypePrettyCode, prettyCodeOptions],
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

        preElement.properties["__withMeta__"] = Object.hasOwn(
          node.children.at(0).properties,
          "data-rehype-pretty-code-title"
        )
        preElement.properties["__rawString__"] = node.__rawString__
      }
    })
  },
  [rehypeAutolinkHeadings, autolinkHeadingsOptions],
]
