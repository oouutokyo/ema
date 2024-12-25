import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { resizeAndCompressImage } from '@/lib/generateEma/imageHelpers';

const generateBase64Image = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) => {
  const canvas = canvasRef.current;
  if (!canvas) throw new Error('Canvas is not defined');
  const base64Image = canvas.toDataURL('image/png');
  return base64Image;
};

export const useForm = (
  fetchEmaList: () => void,
  setSavedImage: React.Dispatch<React.SetStateAction<string | null>>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [kanji, setKanji] = useState('');
  const [loading, setLoading] = useState(false);

  // フォーム送信
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        const base64 = generateBase64Image(canvasRef);
        const resizedBase64 = await resizeAndCompressImage(base64);

        const response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, comment, base64: resizedBase64, kanji }),
        });

        const result = await response.json();
        if (result.success) {
          setSavedImage(base64);
          setName('');
          setComment('');
          setKanji('');
          fetchEmaList(); // 更新された絵馬一覧を取得
        } else {
          console.error('Failed to submit comment');
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      } finally {
        setLoading(false);
      }
    },
    [name, comment, kanji, canvasRef, fetchEmaList, setSavedImage],
  );

  return {
    name,
    comment,
    kanji,
    setName,
    setComment,
    setKanji,
    loading,
    handleSubmit,
  };
};

export const useEmaList = () => {
  const [emaList, setEmaList] = useState([]);
  const [loadingEmaList, setLoadingEmaList] = useState(false);
  // 絵馬一覧を取得
  const fetchEmaList = useCallback(async () => {
    setLoadingEmaList(true);
    try {
      const response = await fetch('/api/fetch-data');
      const data = await response.json();
      if (data.success) {
        setEmaList(data.data || []);
      } else {
        console.error('Failed to fetch emaList');
      }
    } catch (error) {
      console.error('Error fetching emaList:', error);
    }
    setLoadingEmaList(false);
  }, []);

  useEffect(() => {
    fetchEmaList();
  }, [fetchEmaList]);

  return {
    emaList,
    fetchEmaList,
    loadingEmaList,
  };
};
