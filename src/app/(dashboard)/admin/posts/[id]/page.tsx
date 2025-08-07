"use client";

import { useParams } from "next/navigation";
import { PageContainer } from "@toolpad/core/PageContainer";
import invariant from "invariant";
import { useActivePage } from "@toolpad/core/useActivePage";

export default function PostPage() {
  const params = useParams<{ id: string }>();
  const activePage = useActivePage();

  invariant(activePage, "No navigation match");

  const title = `Item ${params.id}`;
  const path = `${activePage.path}/${params.id}`;
  const breadcrumbs = [...activePage.breadcrumbs, { title, path }];

  return (
    <PageContainer title={title} breadcrumbs={breadcrumbs}>
      <div>Post details here</div>
    </PageContainer>
  );
}
