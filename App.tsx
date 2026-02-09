
import React, { useState, useCallback } from 'react';
import { ProductInfo, GeneratedCopy, AppStatus } from './types';
import { generateCopy } from './services/geminiService';
import { logUsageData } from './services/loggingService';
import ProductForm from './components/ProductForm';
import CopyDisplay from './components/CopyDisplay';

const App: React.FC = () => {
  const [formData, setFormData] = useState<ProductInfo>({
    userName: '',
    productName: '',
    region: '',
    features: '',
    producerStory: '',
    season: '',
    target: '',
    tone: '따뜻하고 서정적인',
    outputFormat: 'SNS',
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
      
      await logUsageData({
        ...formData,
        generatedHeadline: copy.headline,
      });

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
      <header className="py-12 md:py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="px-4 py-1.5 bg-stone-100 text-stone-600 rounded-full text-xs md:text-sm font-medium tracking-wide">
              10-YEAR LOCAL CURATOR AI
            </div>
            <button onClick={copyServiceUrl} className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-xs md:text-sm font-bold hover:bg-orange-600 transition-all shadow-sm flex items-center gap-1.5">
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
          <ProductForm formData={formData} onChange={handleInputChange} onSubmit={handleSubmit} isLoading={status === AppStatus.LOADING} />
        </div>

        <div className="lg:col-span-7" id="result-section">
          {status === AppStatus.IDLE && (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-white/50 border-2 border-dashed border-stone-200 rounded-3xl text-stone-400 min-h-[300px]">
              <p className="text-lg font-light text-center">제품 정보를 입력하면<br /> 로컬 큐레이터의 이야기가 시작됩니다.</p>
            </div>
          )}

          {status === AppStatus.LOADING && (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-6"></div>
              <p className="serif text-xl text-stone-600 text-center px-4 leading-relaxed">로컬의 계절과 흙의 향기를 문장에 담고 있습니다...</p>
            </div>
          )}

          {status === AppStatus.SUCCESS && result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <CopyDisplay copy={result} />
              <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-center text-stone-400 text-sm">
                <button onClick={() => setStatus(AppStatus.IDLE)} className="px-6 py-2 border border-stone-200 rounded-full hover:bg-white hover:text-stone-700 transition-all font-medium">새로운 제품 작성하기</button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 py-12 border-t border-stone-100 text-center">
        <p className="text-stone-500 text-sm font-semibold mb-2">슈림컴퍼니_26년</p>
        <p className="text-stone-400 text-xs font-light tracking-widest uppercase">© 2026 Shurim Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
