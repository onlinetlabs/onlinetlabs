import Image, { ImageProps } from "next/image"

const NODES = {
  atm: {
    src: "/gns3/nodes/atm.svg",
  },
  cloud: {
    src: "/gns3/nodes/cloud.svg",
  },
  "ethernet-hub": {
    src: "/gns3/nodes/ethernet-hub.svg",
  },
  isdn: {
    src: "/gns3/nodes/isdn.svg",
  },
  nat: {
    src: "/gns3/nodes/nat.svg",
  },
  switch: {
    src: "/gns3/nodes/switch.svg",
  },
  vpcs: {
    src: "/gns3/nodes/vpcs.svg",
  },
}

type GNS3Props = Omit<ImageProps, "src" | 'alt'> & {
  node: keyof typeof NODES
}

export const GNS3Node = ({
  node,
  width = 32,
  height = 32,
  ...props
}: GNS3Props) => {
  return (
    <Image
      src={NODES[node].src}
      alt={node}
      width={width}
      height={height}
      {...props}
    />
  )
}