
import React from 'react';
import { ProductInfo } from '../types';

interface ProductFormProps {
  formData: ProductInfo;
  onChange: (field: keyof ProductInfo, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ formData, onChange, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
      <div className="pb-4 border-b border-stone-50">
        <label className="block text-sm font-bold text-orange-600 mb-2">사용자 성함 또는 업체명</label>
        <input
          required
          type="text"
          placeholder="데이터 기록을 위해 입력해주세요"
          className="w-full px-4 py-3 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all bg-orange-50/30"
          value={formData.userName}
          onChange={(e) => onChange('userName', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">제품명</label>
          <input
            required
            type="text"
            placeholder="예: 제주 구좌 당근"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all"
            value={formData.productName}
            onChange={(e) => onChange('productName', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">제철 정보</label>
          <input
            required
            type="text"
            placeholder="예: 찬바람 부는 12월~2월"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all"
            value={formData.season}
            onChange={(e) => onChange('season', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-2">지역/원산지</label>
        <input
          required
          type="text"
          placeholder="예: 제주도 구좌읍의 붉은 흙"
          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all"
          value={formData.region}
          onChange={(e) => onChange('region', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-2">핵심 특징</label>
        <input
          required
          type="text"
          placeholder="예: 유기농 재배, 아삭한 식감, 높은 당도"
          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all"
          value={formData.features}
          onChange={(e) => onChange('features', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-2">생산자 이야기/철학 (스토리텔링의 핵심)</label>
        <textarea
          required
          rows={3}
          placeholder="예: 30년 넘게 당근만 바라본 고집, 자연을 거스르지 않는 농법"
          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all resize-none"
          value={formData.producerStory}
          onChange={(e) => onChange('producerStory', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">타겟 고객</label>
          <input
            required
            type="text"
            placeholder="예: 건강한 식단을 챙기는 분들"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all"
            value={formData.target}
            onChange={(e) => onChange('target', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">원하는 톤앤매너</label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all appearance-none bg-white"
            value={formData.tone}
            onChange={(e) => onChange('tone', e.target.value)}
          >
            <option value="따뜻하고 서정적인">따뜻하고 서정적인</option>
            <option value="고급스럽고 신뢰감 있는">고급스럽고 신뢰감 있는</option>
            <option value="청량하고 산뜻한">청량하고 산뜻한</option>
            <option value="위트 있고 유머러스한">위트 있고 유머러스한</option>
            <option value="전통적이고 묵직한">전통적이고 묵직한</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-2">출력 형식</label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => onChange('outputFormat', 'SNS')}
            className={`flex-1 py-3 rounded-xl border-2 transition-all font-medium ${
              formData.outputFormat === 'SNS' 
                ? 'border-orange-500 bg-orange-50 text-orange-600' 
                : 'border-stone-100 bg-stone-50 text-stone-400'
            }`}
          >
            SNS (인스타용 짧은 글)
          </button>
          <button
            type="button"
            onClick={() => onChange('outputFormat', 'BLOG')}
            className={`flex-1 py-3 rounded-xl border-2 transition-all font-medium ${
              formData.outputFormat === 'BLOG' 
                ? 'border-orange-500 bg-orange-50 text-orange-600' 
                : 'border-stone-100 bg-stone-50 text-stone-400'
            }`}
          >
            Blog (블로그/상세페이지용)
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all active:scale-95 ${
          isLoading ? 'bg-stone-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
        }`}
      >
        {isLoading ? '로컬의 숨결을 담는 중...' : '감성 카피 생성하기'}
      </button>
    </form>
  );
};

export default ProductForm;
