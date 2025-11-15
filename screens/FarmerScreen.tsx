
import React, { useState, useRef } from 'react';
import { analyzeCropImage } from '../services/geminiService';
import type { DiagnosisResult } from '../types';
import { CameraIcon, UploadIcon } from '../components/Icons';

interface FarmerScreenProps {
  language: 'en' | 'ar';
  onSaveDiagnosis: (image: string, result: DiagnosisResult) => void;
}

const FarmerScreen: React.FC<FarmerScreenProps> = ({ language, onSaveDiagnosis }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = language === 'ar' ? {
    title: 'تشخيص أمراض المحاصيل بالذكاء الاصطناعي',
    uploadPrompt: 'قم بتحميل صورة أو استخدم الكاميرا',
    selectFile: 'اختر ملفًا',
    useCamera: 'استخدم الكاميرا',
    analyze: 'تحليل الصورة',
    analyzing: 'جاري التحليل...',
    diagnosisResult: 'نتيجة التشخيص',
    disease: 'المرض المكتشف',
    confidence: 'نسبة الثقة',
    symptoms: 'الأعراض',
    recommendedTreatment: 'العلاج الموصى به',
    preventiveMeasures: 'إجراءات وقائية',
    tryAgain: 'تشخيص آخر',
    uploadError: 'خطأ في تحميل الصورة. الرجاء اختيار ملف صورة صالح.',
    analysisError: 'فشل تحليل الصورة. يرجى المحاولة مرة أخرى.',
    saveDiagnosis: 'حفظ التشخيص',
    saved: 'تم الحفظ',
  } : {
    title: 'AI Crop Disease Diagnosis',
    uploadPrompt: 'Upload an image or use your camera',
    selectFile: 'Select File',
    useCamera: 'Use Camera',
    analyze: 'Analyze Image',
    analyzing: 'Analyzing...',
    diagnosisResult: 'Diagnosis Result',
    disease: 'Detected Disease',
    confidence: 'Confidence Score',
    symptoms: 'Symptoms',
    recommendedTreatment: 'Recommended Treatment',
    preventiveMeasures: 'Preventive Measures',
    tryAgain: 'New Diagnosis',
    uploadError: 'Error uploading image. Please select a valid image file.',
    analysisError: 'Failed to analyze image. Please try again.',
    saveDiagnosis: 'Save Diagnosis',
    saved: 'Saved!',
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setBase64Image(base64);
        setImagePreview(reader.result as string);
        setError(null);
        setResult(null);
      };
      reader.readAsDataURL(file);
    } else {
        setError(t.uploadError);
        setImagePreview(null);
        setBase64Image(null);
    }
  };

  const handleAnalyze = async () => {
    if (!base64Image) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    setIsSaved(false); // Reset save state for new analysis
    try {
      const diagnosisResult = await analyzeCropImage(base64Image);
      setResult(diagnosisResult);
    } catch (err) {
      setError(t.analysisError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!base64Image || !result || isSaved) return;
    onSaveDiagnosis(base64Image, result);
    setIsSaved(true);
  };

  const resetState = () => {
    setImagePreview(null);
    setBase64Image(null);
    setResult(null);
    setIsLoading(false);
    setError(null);
    setIsSaved(false);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  const ConfidenceCircle: React.FC<{ score: number }> = ({ score }) => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / 100) * circumference;
    const color = score > 80 ? 'text-green-500' : score > 60 ? 'text-yellow-500' : 'text-red-500';

    return (
        <div className="relative w-24 h-24">
            <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
                <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                <circle className={color} strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${color}`}>{score}%</span>
        </div>
    );
  };

  return (
    <div className={`p-6 min-h-screen bg-light ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
      <h2 className="text-3xl font-bold text-center text-dark mb-8">{t.title}</h2>
      
      {!result && (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xl text-gray-600">{t.analyzing}</p>
            </div>
          ) : (
            <>
              {imagePreview ? (
                <div className="flex flex-col items-center space-y-4">
                  <img src={imagePreview} alt="Crop preview" className="max-h-80 w-auto rounded-lg object-contain" />
                  <div className="flex space-x-4 rtl:space-x-reverse">
                    <button onClick={handleAnalyze} className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2">
                        <span>{t.analyze}</span>
                    </button>
                     <button onClick={resetState} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
                        <span>{t.tryAgain}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <p className="text-lg text-gray-600 mb-6">{t.uploadPrompt}</p>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => fileInputRef.current?.click()} className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse">
                      <UploadIcon />
                      <span>{t.selectFile}</span>
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse">
                      <CameraIcon />
                      <span>{t.useCamera}</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {result && (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl animate-fade-in">
          <h3 className="text-2xl font-bold text-dark mb-6 text-center">{t.diagnosisResult}</h3>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <img src={imagePreview!} alt="Analyzed crop" className="w-full rounded-lg mb-4" />
              <div className="flex items-center justify-around bg-gray-100 p-4 rounded-lg">
                <div className="text-center">
                    <h4 className="text-sm font-bold text-gray-500 uppercase">{t.disease}</h4>
                    <p className="text-xl font-bold text-primary">{result.diseaseName}</p>
                </div>
                <div className="text-center flex flex-col items-center">
                    <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">{t.confidence}</h4>
                    <ConfidenceCircle score={result.confidence} />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-dark mb-2 border-b-2 border-primary pb-1">{t.symptoms}</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {result.symptoms.map((symptom, index) => <li key={index}>{symptom}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-dark mb-2 border-b-2 border-primary pb-1">{t.recommendedTreatment}</h4>
                <p className="text-gray-700">{result.recommendedTreatment}</p>
              </div>
               <div>
                <h4 className="text-lg font-bold text-dark mb-2 border-b-2 border-primary pb-1">{t.preventiveMeasures}</h4>
                <p className="text-gray-700">{result.preventiveMeasures}</p>
              </div>
            </div>
          </div>
           <div className="text-center mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
                onClick={handleSave} 
                disabled={isSaved}
                className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed w-full sm:w-auto"
            >
                {isSaved ? t.saved : t.saveDiagnosis}
            </button>
            <button onClick={resetState} className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition-colors w-full sm:w-auto">
                {t.tryAgain}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerScreen;