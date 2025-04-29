import {
  BookmarkIcon,
  CircleHelpIcon,
  CloudUploadIcon,
  PanelsTopLeftIcon,
  PcCaseIcon,
  SettingsIcon,
} from "lucide-react"

import { Circle } from "@ui/circle"
import Image from "next/image"

export const HowDoesItWork = () => {
  return (
    <div className="hero">
      <div className="text-primary mb-4 flex flex-col justify-center text-center md:mb-8 md:flex-row md:items-baseline md:justify-center md:text-left">
        <h2 className="text-base md:text-xl">Как это работает?</h2>
        <div className="text-muted-foreground mx-auto my-1 w-[70%] md:mx-0 md:my-0 md:ml-4 md:w-auto md:text-xl">
          Прохождение курса. Шаг за шагом.
        </div>
      </div>
      <div className="relative mx-auto mb-4 w-full max-w-7xl">
        <div className="hidden w-full lg:block">
          <svg
            fill="none"
            height="100%"
            viewBox="0 0 1360 524"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="text-primary"
              d="M0 68L1360 68.0001"
              opacity="0.15"
              stroke="currentColor"
              strokeDasharray="2 2"
            ></path>
            <path
              className="text-primary"
              d="M784 524L784 -3.8147e-06"
              opacity="0.15"
              stroke="currentColor"
              strokeDasharray="2 2"
            ></path>
            <path
              className="text-primary"
              d="M1296 524L1296 -3.8147e-06"
              opacity="0.15"
              stroke="currentColor"
              strokeDasharray="2 2"
            ></path>
            <path
              className="text-primary"
              d="M0 455H1360"
              opacity="0.15"
              stroke="currentColor"
              strokeDasharray="2 2"
            ></path>
            <path
              className="text-primary"
              d="M65 524L65 -3.8147e-06"
              opacity="0.15"
              stroke="currentColor"
              strokeDasharray="2 2"
            ></path>
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear_24_5768"
                x1="0"
                x2="1360"
                y1="68"
                y2="68.0001"
              >
                <stop stopOpacity="0"></stop>
                <stop offset="0.115"></stop>
                <stop offset="0.893678"></stop>
                <stop offset="1" stopOpacity="0"></stop>
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint1_linear_24_5768"
                x1="784"
                x2="784"
                y1="524"
                y2="-3.12326e-05"
              >
                <stop stopOpacity="0"></stop>
                <stop offset="0.177083"></stop>
                <stop offset="0.828125"></stop>
                <stop offset="1" stopOpacity="0"></stop>
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint2_linear_24_5768"
                x1="1296"
                x2="1296"
                y1="524"
                y2="-3.12326e-05"
              >
                <stop stopOpacity="0"></stop>
                <stop offset="0.177083"></stop>
                <stop offset="0.828125"></stop>
                <stop offset="1" stopOpacity="0"></stop>
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint3_linear_24_5768"
                x1="0"
                x2="1360"
                y1="455"
                y2="455"
              >
                <stop stopOpacity="0"></stop>
                <stop offset="0.115"></stop>
                <stop offset="0.893678"></stop>
                <stop offset="1" stopOpacity="0"></stop>
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint4_linear_24_5768"
                x1="65"
                x2="64.9999"
                y1="524"
                y2="-3.12328e-05"
              >
                <stop stopOpacity="0"></stop>
                <stop offset="0.177083"></stop>
                <stop offset="0.828125"></stop>
                <stop offset="1" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="inset-0 flex flex-col items-center justify-center lg:absolute lg:flex-row">
          <div className="flex w-full items-center justify-center lg:ml-2 lg:w-[53%]">
            <Image alt="Course explainer" loading="lazy" width="689" height="408" decoding="async" data-nimg="1" className="hidden md:block" src="/course-explainer.png" />
            {/* <img alt="Course explainer" loading="lazy" width="689" height="408" decoding="async" data-nimg="1" className="block md:hidden" style="color:transparent" srcset="/_next/image?url=%2Flearn%2Fcourse-explainer-small.png&amp;w=750&amp;q=75 1x, /_next/image?url=%2Flearn%2Fcourse-explainer-small.png&amp;w=1920&amp;q=75 2x" src="/_next/image?url=%2Flearn%2Fcourse-explainer-small.png&amp;w=1920&amp;q=75"> */}
          </div>
          <div className="flex w-full items-center justify-center lg:w-[38%]">
            <div className="mb-8 flex w-full flex-col space-y-8 px-4 lg:mb-0 lg:space-y-6">
              <div className="flex flex-col items-center leading-6 lg:flex-row">
                <Circle
                  variant="subtle-blue"
                  className="mb-3 h-10 w-10 md:mb-4 lg:mr-4 lg:mb-0"
                >
                  <SettingsIcon className="h-4 w-4" />
                </Circle>
                <div className="text-center lg:text-left">
                  <p className="text-primary text-base">
                    Выберите курс, который хотите пройти
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center leading-6 lg:flex-row">
                <Circle
                  variant="subtle-blue"
                  className="mb-3 h-10 w-10 md:mb-4 lg:mr-4 lg:mb-0"
                >
                  <PanelsTopLeftIcon className="h-4 w-4" />
                </Circle>
                <div className="text-center lg:text-left">
                  <p className="text-primary text-base">
                    Просматривайте материалы с любого устройства
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center leading-6 lg:flex-row">
                <Circle
                  variant="subtle-blue"
                  className="mb-3 h-10 w-10 md:mb-4 lg:mr-4 lg:mb-0"
                >
                  <PcCaseIcon className="h-4 w-4" />
                </Circle>
                <div className="text-center lg:text-left">
                  <p className="text-primary text-base">
                    Возвращайтесь к пройденным главам, если что-то забыли
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center leading-6 lg:flex-row">
                <Circle
                  variant="subtle-blue"
                  className="mb-3 h-10 w-10 md:mb-4 lg:mr-4 lg:mb-0"
                >
                  <CloudUploadIcon className="h-4 w-4" />
                </Circle>
                <div className="text-center lg:text-left">
                  <p className="text-primary text-base">
                    В конце закрепите свои знания на практике, выполнив лабораторную работу
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-col items-center justify-center px-4 lg:max-w-5xl lg:flex-row lg:space-x-8">
        <div className="bg-muted/75 mb-4 flex w-full flex-col items-center rounded-lg p-5 md:p-2 lg:mb-0 lg:flex-row lg:rounded-full">
          <div className="relative mb-2 flex h-12 w-12 items-center justify-center lg:mr-4 lg:mb-0">
            <div className="absolute inset-0">
              <svg
                fill="none"
                height="100%"
                viewBox="0 0 44 45"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="stroke text-muted-foreground/25"
                  d="M15.5577 3.63202C11.612 4.97923 8.188 7.5295 5.76725 10.9241C3.3465 14.3187 2.05086 18.3867 2.06258 22.556"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                ></path>
                <path
                  className="stroke text-muted-foreground/50"
                  d="M22 2.5625C25.6765 2.5625 29.2814 3.57908 32.4163 5.49986C35.5512 7.42065 38.0939 10.1708 39.7634 13.4464C41.4329 16.722 42.1641 20.3955 41.8763 24.0607C41.5885 27.726 40.2929 31.2402 38.1326 34.2151C35.9723 37.19 33.0315 39.5096 29.6352 40.9176C26.239 42.3255 22.5196 42.767 18.8881 42.1932C15.2567 41.6193 11.8546 40.0525 9.05796 37.666C6.26132 35.2795 4.17903 32.1661 3.04125 28.6701"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </div>
            <Circle variant="white" className="h-8 w-8">
              <BookmarkIcon />
            </Circle>
          </div>
          <div className="mt-1 space-y-1 text-center lg:text-left">
            <p className="text-primary text-sm">Учитесь в своем темпе</p>
            <p className="text-muted-foreground text-sm">
              Ваш прогресс синхронизируется по ходу обучения
            </p>
          </div>
        </div>
        <div className="bg-muted/75 mb-4 flex w-full flex-col items-center rounded-lg p-5 md:p-2 lg:mb-0 lg:flex-row lg:rounded-full">
          <div className="relative mb-2 flex h-12 w-12 items-center justify-center lg:mr-4 lg:mb-0">
            <div className="absolute inset-0">
              <svg
                fill="none"
                height="100%"
                viewBox="0 0 44 45"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="stroke text-muted-foreground/25"
                  d="M19.5702 2.71111C15.1785 3.25034 11.091 5.23515 7.95136 8.35292C4.81174 11.4707 2.79844 15.5443 2.22856 19.9321"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                ></path>
                <path
                  className="stroke text-muted-foreground/25"
                  d="M24.4298 2.71111C28.8215 3.25034 32.909 5.23515 36.0486 8.35292C39.1883 11.4707 41.2016 15.5443 41.7714 19.9321"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                ></path>
                <path
                  className="stroke text-muted-foreground/25"
                  d="M24.4298 42.2889C28.8215 41.7497 32.909 39.7649 36.0486 36.6471C39.1883 33.5293 41.2016 29.4557 41.7714 25.0679"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                ></path>
                <path
                  className="stroke text-muted-foreground/25"
                  d="M19.5702 42.2889C15.1785 41.7497 11.091 39.7649 7.95136 36.6471C4.81174 33.5293 2.79844 29.4557 2.22856 25.0679"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </div>
            <Circle variant="white" className="h-8 w-8">
              <CircleHelpIcon />
            </Circle>
          </div>
          <div className="mt-1 space-y-1 text-center lg:text-left">
            <p className="text-primary text-sm">
              Проверяйте свои знания в каждой главе
            </p>
            <p className="text-muted-foreground text-sm">
              Пройдите викторину, чтобы проверить себя
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
