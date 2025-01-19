import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb"


type Crumb = {
    label: string,
    href: string
}

type Props = {
   crumbs: Crumb[]
}
export default function BreadcrumbBuilder({crumbs}: Props) {

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {crumbs.map((c) => c.href === '' ? (<BreadcrumbItem>
                <BreadcrumbPage>{c.label}</BreadcrumbPage>
                </BreadcrumbItem>) :(
                    <>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={c.href}>
                            {c.label}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    </>
                )
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}