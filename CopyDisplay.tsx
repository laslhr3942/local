
import React from 'react';
import { GeneratedCopy } from '../types';

interface CopyDisplayProps {
  copy: GeneratedCopy;
}

const CopyDisplay: React.FC<CopyDisplayProps> = ({ copy }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('문장이 복사되었습니다. 원하는 곳에 붙여넣으세요!');
  };

  const handleShare = async () => {
    const fullText = `${copy.headline}\n\n${copy.body}\n\n${copy.hashtags.join(' ')}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '로컬 큐레이터의 선물',
          text: fullText,
          url: window.location.href,
        });
      } catch (err) {
        handleCopy(fullText);
      }
    } else {
      handleCopy(fullText);
    }
  };

  const fullText = `${copy.headline}\n\n${copy.body}\n\n${copy.hashtags.join(' ')}`;

  return (
    <div className="bg-[#fffdfa] p-6 md:p-10 rounded-2xl shadow-xl border border-orange-100 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-2 h-full bg-orange-400"></div>
      
      <div className="flex justify-between items-start mb-6 md:mb-8">
        <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full uppercase tracking-wider">
          Curated Copy
        </span>
        <div className="flex gap-3">
          <button 
            onClick={() => handleCopy(fullText)}
            className="p-2 text-stone-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all"
            title="텍스트 복사"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button 
            onClick={handleShare}
            className="p-2 text-stone-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all"
            title="친구에게 공유"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      <h2 className="serif text-xl md:text-2xl lg:text-3xl font-bold text-stone-800 mb-6 md:mb-8 leading-tight">
        {copy.headline}
      </h2>

      <div className="space-y-6">
        <p className="text-stone-600 leading-relaxed whitespace-pre-wrap text-base md:text-lg font-light">
          {copy.body}
        </p>

        <div className="pt-6 border-t border-stone-100">
          <div className="flex flex-wrap gap-2">
            {copy.hashtags.map((tag, idx) => (
              <span key={idx} className="text-orange-400 font-medium text-sm md:text-base">
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyDisplay;
