"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSourceCodeUser } from "@/services/sourceCodeService";
import SourceCodeDetail from "@/components/SourceCodeDetail";

const SourceCodeDetailPage: React.FC = () => {
  const { url } = useParams();
  const [sourceCode, setSourceCode] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSourceCode = async () => {
      if (url) {
        try {
          const data = await getSourceCodeUser(url as string);
          setSourceCode(data.data);
          setLoading(false);
        } catch (err: any) {
          setError("Không tìm thấy source code hoặc có lỗi xảy ra.");
          setLoading(false);
        }
      }
    };

    fetchSourceCode();
  }, [url]);

  if (loading) return <div className="min-h-screen">Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return <SourceCodeDetail sourcecode={sourceCode} />;
};

export default SourceCodeDetailPage;
