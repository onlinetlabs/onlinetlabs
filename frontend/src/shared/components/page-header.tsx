import { cn } from "@lib/utils"

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "border-border flex flex-col items-start gap-2 border-b py-8 md:py-10 lg:py-12",
        className
      )}
      data-slot="page-header"
      {...props}
    >
      <div className="container" data-slot="page-header-container">
        {children}
      </div>
    </section>
  )
}

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-3xl leading-tight font-bold tracking-tighter md:text-4xl lg:leading-[1.1]",
        className
      )}
      data-slot="page-header-heading"
      {...props}
    />
  )
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-foreground max-w-2xl text-lg font-light text-balance",
        className
      )}
      data-slot="page-header-description"
      {...props}
    />
  )
}

function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-start gap-2 py-2",
        className
      )}
      data-slot="page-actions"
      {...props}
    />
  )
}

export { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading }
