import Image from "next/image"

import { siteConfig } from "@shared/config/site"

const title = `${siteConfig.name} — ${siteConfig.description.toLowerCase()}`

export const About = () => {
  return (
    <section className="hero">
      <div className="md:w-[696px] md:mx-auto lg:w-[928px] xl:w-[1168px]">
        <h2 className="mb-10 font-medium text-3xl lg:text-[52px] leading-none md:w-[456px] lg:mb-14 lg:w-[864px]">
          {title}
        </h2>
        <div className="grid lg:gap-x-5 lg:grid-rows-2 lg:grid-cols-[528px_1fr] xl:grid-cols-[668px_1fr]">
          <div className="flex rounded-[20px] p-[20px_20px_60%] overflow-hidden relative md:items-start md:col-[1/2] md:row-[2/1] md:min-h-[546px] md:p-5 lg:items-end lg:rounded-[32px] lg:row-span-full lg:min-h-[414px] lg:p-6 xl:min-h-[524px] bg-muted">
            <Image
              src="/placeholder.svg"
              objectFit="cover"
              alt="placeholder"
              fill
            />
          </div>
          <ul className="list-none mt-2 md:mt-5 gap-x-5 grid-cols-2 md:grid lg:grid-cols-1 lg:mt-0 lg:gap-y-5 lg:cols-[2/-1] lg:row-[1/-1] lg:grid-rows-2 md:[&>*:not(:last-child)]:mb-0 [&>*:not(:last-child)]:mb-2">
            <li className="relative p-5 overflow-hidden min-h-[206px] rounded-[20px] bg-muted/75 md:min-h-[206px] lg:rounded-[32px] lg:p-8 lg:min-h-[auto]">
              <div className="gap-3 flex flex-col h-full relative">
                <picture className="flex items-center justify-center h-20 w-max">
                  <img
                    src="/gns3.png"
                    className="w-auto h-auto max-h-full block max-w-full object-contain overflow-hidden"
                    alt="GNS3"
                  />
                </picture>
                <p className="text-base mt-4">
                  Инструмент для проектирования сетей
                  <br />в виртуальной среде
                </p>
              </div>
            </li>
            <li className="relative p-5 overflow-hidden min-h-[206px] rounded-[20px] bg-muted/75 md:min-h-[206px] lg:rounded-[32px] lg:p-8 lg:min-h-[auto]">
              текст
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
