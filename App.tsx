
import React, { useState, useCallback } from 'react';
import { ProductInfo, GeneratedCopy, AppStatus } from './types';
import { generateCopy } from './geminiService';
import ProductForm from './components/ProductForm';
import CopyDisplay from './components/CopyDisplay';

const App: React.FC = () => {
  const [formData, setFormData] = useState<ProductInfo>({
    productName: '',
    region: '',
    features: '',
    target: '',
    tone: '따뜻하고 서정적인',
  });

  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<GeneratedCopy | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((field: keyof ProductInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(AppStatus.LOADING);
    setError(null);

    try {
      const copy = await generateCopy(formData);
      setResult(copy);
      setStatus(AppStatus.SUCCESS);
      
      setTimeout(() => {
        const resultElement = document.getElementById('result-section');
        resultElement?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
      setStatus(AppStatus.ERROR);
    }
  };

  const copyServiceUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('서비스 주소가 복사되었습니다! 친구들에게 공유해 보세요.');
  };

  return (
    <div className="min-h-screen pb-20 bg-[#fcfaf7]">
      {/* Header */}
      <header className="py-12 md:py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="px-4 py-1.5 bg-stone-100 text-stone-600 rounded-full text-xs md:text-sm font-medium tracking-wide">
              10-YEAR LOCAL CURATOR AI
            </div>
            <button 
              onClick={copyServiceUrl}
              className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-xs md:text-sm font-bold hover:bg-orange-600 transition-all shadow-sm flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 md:w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              친구에게 링크 보내기
            </button>
          </div>
          <h1 className="serif text-3xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-6 leading-tight">
            로컬의 숨겨진 가치,<br />
            <span className="text-orange-500">감성 카피</span>로 피어나다
          </h1>
          <p className="text-stone-500 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed px-4">
            지역 고유의 제품이 가진 서사를 발굴하여<br className="hidden md:block" />
            고객에게 닿는 가장 따뜻한 이야기를 씁니다.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="lg:col-span-5">
          <ProductForm
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={status === AppStatus.LOADING}
          />
        </div>

        <div className="lg:col-span-7" id="result-section">
          {status === AppStatus.IDLE && (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-white/50 border-2 border-dashed border-stone-200 rounded-3xl text-stone-400 min-h-[300px]">
              <svg className="w-16 h-16 mb-4 opacity-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <p className="text-lg font-light text-center">제품 정보를 입력하면<br className="md:hidden" /> 로컬 큐레이터의 이야기가 시작됩니다.</p>
            </div>
          )}

          {status === AppStatus.LOADING && (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-6"></div>
              <p className="serif text-xl text-stone-600 text-center px-4 leading-relaxed">로컬의 계절과 흙의 향기를<br className="md:hidden" /> 문장에 담고 있습니다...</p>
            </div>
          )}

          {status === AppStatus.ERROR && (
            <div className="bg-red-50 border border-red-100 p-8 rounded-2xl text-center shadow-sm">
              <h3 className="text-red-800 font-bold mb-2">오류가 발생했습니다</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <button onClick={handleSubmit} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">다시 시도하기</button>
            </div>
          )}

          {status === AppStatus.SUCCESS && result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <CopyDisplay copy={result} />
              <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-center text-stone-400 text-sm">
                <span>큐레이션이 마음에 드시나요?</span>
                <button 
                  onClick={() => setStatus(AppStatus.IDLE)} 
                  className="px-6 py-2 border border-stone-200 rounded-full hover:bg-white hover:text-stone-700 hover:border-stone-400 transition-all font-medium"
                >
                  새로운 제품 작성하기
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 py-12 border-t border-stone-100 text-center">
        <p className="text-stone-400 text-xs font-light tracking-widest uppercase">
          © 2024 Local Curator Copywriter. Designed with soul & heritage.
        </p>
      </footer>
    </div>
  );
};

export default App;
