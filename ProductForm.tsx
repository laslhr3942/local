
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
        <textarea
          required
          rows={3}
          placeholder="예: 유기농 재배, 아삭한 식감, 높은 당도"
          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all resize-none"
          value={formData.features}
          onChange={(e) => onChange('features', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">타겟 고객</label>
          <input
            required
            type="text"
            placeholder="예: 건강한 식단을 챙기는 30대"
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
