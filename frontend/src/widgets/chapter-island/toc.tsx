import { TableOfContentsDrawer } from "./toc-drawer.client"
import { TableOfContentsPopover } from "./toc-popover.client"
import { getChaptersByNamespace } from "@lib/chapter"

export const TableOfContents = async ({ namespace }: Props) => {
  const chapters = await getChaptersByNamespace(namespace)
  return (
    <>
      <TableOfContentsPopover
        chapters={chapters}
        className="max-sm:hidden"
        namespace={namespace}
      />
      <TableOfContentsDrawer
        chapters={chapters}
        className="sm:hidden"
        namespace={namespace}
      />
    </>
  )
}

type Props = {
  namespace: string
}
