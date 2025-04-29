import Image from "next/image"

import { siteConfig } from "@shared/config/site"

const title = `${siteConfig.name} — ${siteConfig.description.toLowerCase()}`

export const About = () => {
  return (
    <section className="hero">
      <div className="md:mx-auto md:w-[696px] lg:w-[928px] xl:w-[1168px]">
        <h2 className="mb-10 text-3xl leading-none font-medium md:w-[456px] lg:mb-14 lg:w-[864px] lg:text-[52px]">
          {title}
        </h2>
        <div className="grid lg:grid-cols-[528px_1fr] lg:grid-rows-2 lg:gap-x-5 xl:grid-cols-[668px_1fr]">
          <div className="bg-muted relative flex overflow-hidden rounded-[20px] p-[20px_20px_60%] md:col-[1/2] md:row-[2/1] md:min-h-[546px] md:items-start md:p-5 lg:row-span-full lg:min-h-[414px] lg:items-end lg:rounded-[32px] lg:p-6 xl:min-h-[524px]">
            <Image
              src="/placeholder.svg"
              objectFit="cover"
              alt="placeholder"
              className="dark:brightness-[0.2] dark:grayscale"
              fill
            />
          </div>
          <ul className="lg:cols-[2/-1] mt-2 list-none grid-cols-2 gap-x-5 md:mt-5 md:grid lg:row-[1/-1] lg:mt-0 lg:grid-cols-1 lg:grid-rows-2 lg:gap-y-5 [&>*:not(:last-child)]:mb-2 md:[&>*:not(:last-child)]:mb-0">
            <li className="bg-muted/75 relative min-h-[206px] overflow-hidden rounded-[20px] p-5 md:min-h-[206px] lg:min-h-[auto] lg:rounded-[32px] lg:p-8">
              <div className="relative flex h-full flex-col gap-3">
                <picture className="flex h-20 w-max items-center justify-center">
                  <img
                    src="/gns3.png"
                    className="block h-auto max-h-full w-auto max-w-full overflow-hidden object-contain"
                    alt="GNS3"
                  />
                </picture>
                <p className="mt-4 text-base">
                  Инструмент для проектирования сетей
                  <br />в виртуальной среде
                </p>
              </div>
            </li>
            <li className="bg-muted/75 relative min-h-[206px] overflow-hidden rounded-[20px] md:min-h-[206px] lg:min-h-[auto] lg:rounded-[32px]">
              <video preload="none" autoPlay loop muted className="size-full">
                <source src="/gns3/demo.mp4" type="video/mp4" />
                <source src="/gns3/demo.webm" type="video/webm" />
              </video>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
