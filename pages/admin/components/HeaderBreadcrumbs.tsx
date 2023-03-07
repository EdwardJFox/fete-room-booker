import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type HeaderBreadcrumbsProps = {
  pages: {
    href: string;
    title: string
  }[];
}

const HeaderBreadcrumbs = ({ pages }: HeaderBreadcrumbsProps) => {
  return (
    <div className="flex mt-4 mb-4">
      {pages.map((page, index) => 
        <div className="flex-initial flex items-center" key={page.href}>
          <Link href={page.href}>
            <h1>{ page.title }</h1>
          </Link>
          { index < (pages.length - 1) && <FontAwesomeIcon icon={faChevronRight} className="mx-3 text-white"/>}
        </div>
      )}
    </div>
  )
}

export default HeaderBreadcrumbs;