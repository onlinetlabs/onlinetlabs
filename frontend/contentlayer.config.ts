import { Course, Lab } from "@contentlayer"
import { rehypePlugins, remarkPlugins } from "@contentlayer/lib/plugins"
import { makeSource } from "contentlayer2/source-files"

export default makeSource({
  contentDirPath: "./src/content",
  documentTypes: [Course, Lab],
  mdx: {
    remarkPlugins: remarkPlugins,
    rehypePlugins: rehypePlugins,
  },
})
