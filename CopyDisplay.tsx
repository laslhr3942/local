
import React from 'react';
import { GeneratedCopy } from '../types';

interface CopyDisplayProps {
  copy: GeneratedCopy;
}

const CopyDisplay: React.FC<CopyDisplayProps> = ({ copy }) => {
  const currentUrl = window.location.href;
  const fullText = `${copy.headline}\n\n${copy.body}\n\n${copy.hashtags.join(' ')}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('문장이 복사되었습니다. 원하는 곳에 붙여넣으세요!');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(url, 'facebook-share-dialog', 'width=800,height=600');
  };

  const shareToKakao = () => {
    // 카카오톡 공유 링크 (웹 전용 샤러)
    const url = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(currentUrl)}`;
    window.open(url, 'kakao-share-dialog', 'width=500,height=500');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '로컬 큐레이터의 선물',
          text: fullText,
          url: currentUrl,
        });
      } catch (err) {
        handleCopy(fullText);
      }
    } else {
      handleCopy(fullText);
    }
  };

  return (
    <div className="bg-[#fffdfa] p-6 md:p-10 rounded-2xl shadow-xl border border-orange-100 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-2 h-full bg-orange-400"></div>
      
      <div className="flex justify-between items-start mb-6 md:mb-8">
        <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full uppercase tracking-wider">
          Curated Story
        </span>
        <button 
          onClick={() => handleCopy(fullText)}
          className="flex items-center gap-2 px-3 py-1.5 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-all text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          전체 복사
        </button>
      </div>

      <h2 className="serif text-2xl md:text-3xl font-bold text-stone-800 mb-6 md:mb-8 leading-tight decoration-orange-200 decoration-4 underline-offset-4">
        {copy.headline}
      </h2>

      <div className="space-y-6">
        <div className="text-stone-600 leading-relaxed whitespace-pre-wrap text-base md:text-lg font-light tracking-tight">
          {copy.body}
        </div>

        <div className="pt-8 border-t border-stone-100">
          <div className="flex flex-wrap gap-2 mb-10">
            {copy.hashtags.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-stone-50 text-orange-500 font-medium text-sm rounded-md border border-stone-100">
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>

          <div className="bg-stone-50/50 rounded-2xl p-6 md:p-8 border border-stone-100">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6 text-center italic">Spread the Local Story</p>
            <div className="flex justify-center items-center gap-6 md:gap-10">
              {/* 카카오톡 */}
              <button 
                onClick={shareToKakao}
                className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-[#FEE500] rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                  <svg className="w-7 h-7 text-[#3C1E1E]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.707 4.8 4.315 6.055-.177.65-.638 2.347-.732 2.72-.116.47.165.465.347.346.143-.094 2.283-1.55 3.205-2.176.6.088 1.222.135 1.865.135 4.97 0 9-3.186 9-7.115S16.97 3 12 3z"/>
                  </svg>
                </div>
                <span className="text-xs font-semibold text-stone-500">카카오톡</span>
              </button>

              {/* 페이스북 */}
              <button 
                onClick={shareToFacebook}
                className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-[#1877F2] rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all text-white">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="text-xs font-semibold text-stone-500">페이스북</span>
              </button>

              {/* 기본 공유 (시스템) */}
              <button 
                onClick={handleNativeShare}
                className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-white border border-stone-200 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all text-stone-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-stone-500">시스템 공유</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyDisplay;
