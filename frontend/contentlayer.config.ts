import { Course, Lab } from "@contentlayer"
import {
  makeSource,
} from "contentlayer2/source-files"
import { rehypePlugins, remarkPlugins } from "@contentlayer/lib/plugins"

export default makeSource({
  contentDirPath: "./src/content",
  documentTypes: [Course, Lab],
  mdx: {
    remarkPlugins: remarkPlugins,
    rehypePlugins: rehypePlugins 
  },
})
