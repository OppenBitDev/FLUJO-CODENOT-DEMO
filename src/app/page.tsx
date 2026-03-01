"use client";

import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    cedula: "",
    colegiatura: "",
    email: "",
    telefono: "",
    direccion: "",
    provincia: "dn",
    password: "",
    confirmPassword: "",
    twoFactorMethod: "app",
    termsAccepted: false,
    privacyAccepted: false,
    biometricAccepted: false,
    signatureAccepted: false,
  });

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => {
    setErrorMsg("");
    setStep((s) => s - 1);
  };
  const handleRestart = () => {
    setStep(1);
    setErrorMsg("");
    setFormData({
      ...formData,
      cedula: "",
      colegiatura: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const simulateLoading = (callback: () => void, duration = 1200) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      callback();
    }, duration);
  };

  const handleIdentificacionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cedula || !formData.colegiatura) {
      setErrorMsg("Todos los campos marcados con (*) son obligatorios.");
      return;
    }
    setErrorMsg("");

    simulateLoading(() => {
      if (formData.cedula === "00000000000") setStep(201); // Error Not exists
      else setStep(3); // Success
    });
  };

  const handleBiometricSubmit = () => {
    simulateLoading(() => {
      if (formData.cedula === "11111111111") setStep(301); // Error Biometric
      else setStep(4);
    }, 2000);
  };

  const handleRequirementsSubmit = () => {
    simulateLoading(() => {
      if (formData.cedula === "22222222222") setStep(401); // Error Inactive
      else setStep(5);
    });
  };

  const InputLabel = ({ children, required = false }: { children: React.ReactNode, required?: boolean }) => (
    <label className="block text-sm font-semibold text-slate-700 mb-1.5 transition-colors">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const InputField = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...props}
      className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0f3460]/20 focus:border-[#0f3460] focus:bg-white text-slate-900 transition-all ${props.className || ''}`}
    />
  );

  const PrimaryButton = ({ children, onClick, disabled, className = "", type = "button" }: any) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 bg-[#0f3460] hover:bg-[#1a233a] active:scale-[0.98] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:hover:scale-100 disabled:hover:bg-[#0f3460] disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );

  const SecondaryButton = ({ children, onClick, disabled, className = "", type = "button" }: any) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] rounded-xl font-medium shadow-sm transition-all disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 py-2">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center p-3 bg-blue-50 border border-blue-100 rounded-2xl mb-2 text-[#0f3460]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Habilitación Notario Digital</h1>
              <p className="text-slate-600 text-base max-w-lg mx-auto leading-relaxed">
                Portal oficial del Colegio Dominicano de Notarios. Inicie su solicitud para obtener credenciales de ejercicio notarial electrónico.
              </p>
            </div>

            <div className="bg-blue-50/50 border border-blue-100/50 text-blue-800 px-5 py-4 rounded-2xl text-sm text-center shadow-sm">
              <span className="font-semibold block mb-1">Requisitos Previos:</span>
              Cédula de identidad física y cámara habilitada para verificación biométrica.
            </div>

            <div className="text-center pt-4">
              <PrimaryButton onClick={() => setStep(2)} className="w-full sm:w-auto h-14 px-8 text-lg">
                Iniciar Solicitud Formal
              </PrimaryButton>
            </div>
          </div>
        );

      case 2:
        return (
          <form onSubmit={handleIdentificacionSubmit} className="space-y-8">
            <div className="border-b border-slate-100 pb-5 mb-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Identificación Nacional</h2>
              <p className="text-slate-500 text-sm mt-1.5">Consulta automática al padrón central oficial.</p>
            </div>

            <div className="space-y-5">
              <div>
                <InputLabel required>Número de Cédula de Identidad</InputLabel>
                <InputField
                  placeholder="Ej: 001-0000000-1"
                  value={formData.cedula}
                  onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                />
                <p className="text-[11px] font-medium mt-2 text-slate-400 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-slate-500">Pruebas:</span> Use 000 para forzar error de padrón / 111 para error biométrico
                </p>
              </div>
              <div>
                <InputLabel required>No. Colegiatura CODENOT</InputLabel>
                <InputField
                  placeholder="Ej: 12345"
                  value={formData.colegiatura}
                  onChange={(e) => setFormData({ ...formData, colegiatura: e.target.value })}
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 text-red-800 text-sm border border-red-100/50 flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {errorMsg}
              </div>
            )}

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <SecondaryButton onClick={handlePrev}>Volver</SecondaryButton>
              <PrimaryButton type="submit" disabled={loading} className="min-w-[140px] flex items-center justify-center gap-2">
                {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {loading ? "Consultando..." : "Siguiente Paso"}
              </PrimaryButton>
            </div>
          </form>
        );

      case 201:
        return (
          <div className="space-y-6 text-center py-6">
            <div className="w-20 h-20 mx-auto bg-red-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
              <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Registro No Encontrado</h2>
            <p className="text-slate-600 max-w-md mx-auto">
              El usuario ingresado no figura en el padrón activo del Colegio Dominicano de Notarios.
            </p>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-500 max-w-sm mx-auto">
              Comuníquese con la sede central al (809) 682-8255 si considera que esto es un error.
            </div>
            <div className="flex justify-center pt-6">
              <PrimaryButton onClick={handleRestart}>Intentar Nuevamente</PrimaryButton>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="border-b border-slate-100 pb-5 mb-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Verificación Biométrica</h2>
              <p className="text-slate-500 text-sm mt-1.5">
                Validación facial contra la base centralizada del Estado.
              </p>
            </div>

            <div className="flex flex-col items-center py-8">
              <div className={`w-56 h-56 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-500 ${loading ? 'border-[6px] border-[#0f3460]/20 bg-blue-50/50 scale-105 shadow-xl' : 'border-4 border-dashed border-slate-200 bg-slate-50/50'}`}>
                {loading ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-[5px] border-t-[#0f3460] border-blue-200/50 rounded-full animate-spin mb-4"></div>
                    <span className="text-sm font-bold text-[#0f3460] tracking-wide uppercase">Cotejando...</span>
                  </div>
                ) : (
                  <svg className="w-20 h-20 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {loading && <div className="absolute inset-0 bg-[#0f3460]/5 mix-blend-overlay animate-pulse" />}
              </div>
              <p className="text-sm text-slate-500 text-center max-w-sm mt-6">
                Coloque su rostro e iluminación estable frente a la cámara.
              </p>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <SecondaryButton disabled={loading} onClick={handlePrev}>Volver</SecondaryButton>
              <PrimaryButton
                onClick={handleBiometricSubmit}
                disabled={loading}
                className="min-w-[160px]"
              >
                {loading ? "Analizando" : "Iniciar Escaneo"}
              </PrimaryButton>
            </div>
          </div>
        );

      case 301:
        return (
          <div className="space-y-6 text-center py-6">
            <div className="w-20 h-20 mx-auto bg-red-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
              <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Biometría Fallida</h2>
            <div className="bg-red-50/50 border border-red-100 text-red-800 p-5 rounded-2xl text-sm text-left max-w-md mx-auto shadow-sm">
              <span className="font-semibold block mb-2 text-red-900">Alerta de Seguridad:</span>
              Los vectores faciales capturados no arrojan coincidencia con el titular de la cédula registrada en la JCE.
            </div>
            <div className="flex justify-center pt-6">
              <PrimaryButton onClick={() => setStep(3)}>Reintentar Captura</PrimaryButton>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="border-b border-slate-100 pb-5 mb-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Calificación Normativa</h2>
              <p className="text-slate-500 text-sm mt-1.5">Inspección administrativa obligatoria en línea.</p>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 md:p-6 space-y-4">
              {[
                { label: 'Estado activo de colegiatura', status: loading ? 'pending' : 'ok' },
                { label: 'Historial de suspensiones limpio', status: loading ? 'pending' : 'ok' },
                { label: 'Sanciones disciplinarias', status: loading ? 'pending' : 'ok' },
                { label: 'Vigencia en Suprema Corte de Justicia', status: loading ? 'pending' : 'ok' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <span className="text-slate-700 font-medium">{item.label}</span>
                  {item.status === 'pending' ? (
                    <span className="inline-flex items-center gap-2 text-[#0f3460] font-semibold text-xs bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0f3460] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0f3460]"></span>
                      </span>
                      Evaluando
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-green-700 font-bold text-xs bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      Aprobado
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-6 border-t border-slate-100">
              <PrimaryButton
                onClick={handleRequirementsSubmit}
                disabled={loading}
                className="min-w-[240px] shadow-lg"
              >
                {loading ? "Validando Protocolos..." : "Ejecutar Validación Oficial"}
              </PrimaryButton>
            </div>
          </div>
        );

      case 401:
        return (
          <div className="space-y-6 text-center py-6">
            <div className="w-20 h-20 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-200">
              <svg className="w-10 h-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Habilitación Denegada</h2>
            <div className="bg-slate-50 border border-slate-200 text-slate-700 p-5 rounded-2xl text-sm text-left max-w-md mx-auto">
              El solicitante presenta estatus inactivo o irregularidades en los registros colegiados. La emisión de certificados digitales notariados no es posible en este estado.
            </div>
            <div className="pt-6">
              <SecondaryButton onClick={handleRestart}>Finalizar Sesión</SecondaryButton>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="border-b border-slate-100 pb-5 mb-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Directorio del Despacho</h2>
              <p className="text-slate-500 text-sm mt-1.5">Configure la información de contacto legal e institucional.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <InputLabel required>Correo Oficial Notarial</InputLabel>
                <InputField type="email" placeholder="contacto@notario.do" />
              </div>
              <div className="space-y-1">
                <InputLabel required>Teléfono / Celular Principal</InputLabel>
                <InputField type="tel" placeholder="(809) 000-0000" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <InputLabel required>Dirección Física Exacta (Sede)</InputLabel>
                <InputField type="text" placeholder="Introduzca la dirección descriptiva completa" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <InputLabel required>Provincia de Jurisdicción</InputLabel>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0f3460]/20 focus:border-[#0f3460] focus:bg-white text-slate-900 appearance-none transition-all">
                    <option value="dn">Distrito Nacional</option>
                    <option value="stgo">Santiago de los Caballeros</option>
                    <option value="sto_dgo">Santo Domingo</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <SecondaryButton onClick={handlePrev}>Volver</SecondaryButton>
              <PrimaryButton onClick={handleNext}>Registrar y Continuar</PrimaryButton>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="border-b border-slate-100 pb-5 mb-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Seguridad Perimetral</h2>
              <p className="text-slate-500 text-sm mt-1.5">Asignación de claves y factores de autenticación (2FA).</p>
            </div>

            <div className="space-y-6">
              {/*<div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">*/}
              {/*  <div>*/}
              {/*    <InputLabel required>Clave de Acceso Maestra</InputLabel>*/}
              {/*    <InputField type="password" placeholder="Mínimo 8 caracteres alfanuméricos" />*/}
              {/*  </div>*/}
              {/*  <div>*/}
              {/*    <InputLabel required>Validar Clave</InputLabel>*/}
              {/*    <InputField type="password" placeholder="Repita la clave" />*/}
              {/*  </div>*/}
              {/*</div>*/}

              <div className="pt-2">
                <InputLabel required>Segundo Factor Obligatorio (2FA)</InputLabel>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  {[
                    { id: 'app', label: 'App Autenticadora', badge: 'Recomendado' },
                    { id: 'sms', label: 'Mensaje SMS' },
                    { id: 'email', label: 'Correo Eléctronico' }
                  ].map((method) => (
                    <label key={method.id} className="relative flex flex-col items-center justify-center p-4 bg-white border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-[#0f3460]/30 hover:bg-slate-50 transition-all has-[:checked]:border-[#0f3460] has-[:checked]:bg-blue-50/30">
                      <input type="radio" name="2fa" className="absolute opacity-0" defaultChecked={method.id === 'app'} />
                      <span className="text-sm font-semibold text-slate-800 text-center">{method.label}</span>
                      {method.badge && <span className="mt-2 text-[10px] font-bold tracking-wider text-green-700 bg-green-100 px-2.5 py-1 rounded-full uppercase">{method.badge}</span>}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <SecondaryButton onClick={handlePrev}>Volver</SecondaryButton>
              <PrimaryButton onClick={handleNext}>Guardar Credenciales</PrimaryButton>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-8">
            <div className="border-b border-slate-100 pb-5 mb-2">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Consentimiento Legal</h2>
              <p className="text-slate-500 text-sm mt-1.5">Acuerdos de confidencialidad y responsabilidades fiduciarias.</p>
            </div>

            <div className="bg-slate-50/50 p-6 border border-slate-200 rounded-2xl space-y-5">
              {[
                "He leído y acepto los Términos de Servicio del Sistema Notariado Digital de la DGII / CODENOT / JCE.",
                "Acepto el tratamiento de datos normada por Ley sobre Protección de Datos de Carácter Personal.",
                "Autorizo formalmente el contraste biométrico con los bancos de datos y padrones de identidad del Estado.",
                "Adquiro responsabilidad civil y penal en el uso de firma electrónica y sellos digitales a mi nombre."
              ].map((text, i) => (
                <label key={i} className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded border-2 border-slate-300 mt-0.5 group-hover:border-[#0f3460] transition-colors">
                    <input type="checkbox" className="peer absolute opacity-0 w-full h-full cursor-pointer" />
                    <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity bg-[#0f3460] absolute inset-0 m-auto rounded-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-700 leading-relaxed font-medium group-hover:text-slate-900 transition-colors">
                    {text}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <SecondaryButton onClick={handlePrev}>Rechazar y Salir</SecondaryButton>
              <PrimaryButton onClick={handleNext} className="bg-green-700 hover:bg-green-800 disabled:bg-green-700/50 shadow-green-700/20">Finalizar Acuerdos</PrimaryButton>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-8">
            <div className="border-b border-slate-100 pb-5 mb-2 text-center">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Cierre de Expediente</h2>
              <p className="text-slate-500 text-sm mt-1.5">Visualización resumida de la solicitud a tramitar.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-200 py-3 px-5 flex items-center justify-between">
                <span className="font-bold text-slate-700 text-sm uppercase tracking-wide">Datos Principales</span>
                <span className="px-2.5 py-1 bg-blue-100 text-[#0f3460] text-[10px] font-bold rounded uppercase">Tramitación Nueva</span>
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Cédula Oficial</p>
                  <p className="font-mono font-medium text-slate-900 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">{formData.cedula || "001-XXXXXXX-X"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Registro Notarial</p>
                  <p className="font-mono font-medium text-slate-900 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">CN-{formData.colegiatura || "12345"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Demarcación Geográfica</p>
                  <p className="font-medium text-slate-900 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">Distrito Nacional</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Protocolo Seguridad</p>
                  <p className="font-medium text-slate-900 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0f3460]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    TOTP (App)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <SecondaryButton onClick={handlePrev}>Modificar</SecondaryButton>
              <PrimaryButton
                onClick={() => {
                  simulateLoading(() => setStep(10), 2500);
                  setStep(9);
                }}
              >
                Rubricar y Enviar a Sede
              </PrimaryButton>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="py-16 flex flex-col items-center justify-center space-y-8">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-[#0f3460] rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">Generando Solicitud Formal</h2>
              <div className="bg-slate-50 border border-slate-200 w-full min-w-[300px] p-4 rounded-xl text-xs text-slate-600 font-mono space-y-2.5 text-left shadow-inner">
                <p className="text-[#0f3460] font-semibold">&gt; Preparando encapsulado criptográfico...</p>
                <p className="opacity-80">&gt; Registrando huellas digitales en log central...</p>
                <p className="opacity-60">&gt; Transmitiendo petición vía portal seguro...</p>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-8 text-center py-4">
            <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-200">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Tramitación Recibida</h2>
              <p className="text-slate-600 max-w-sm mx-auto mt-3">
                Su petición ha sido aceptada en el buzón electrónico del Consejo. Se ha remitido copia del registro a su correo notarial.
              </p>
            </div>

            <div className="bg-slate-50 border-2 border-slate-200 p-5 rounded-2xl text-center inline-block shadow-sm">
              <p className="text-[11px] text-slate-500 uppercase font-bold tracking-widest mb-1">Id Protocolar</p>
              <p className="text-2xl font-mono font-extrabold text-[#0f3460] tracking-wider">ST2C-X8F</p>
            </div>

            <div className="pt-8 w-full border-t border-slate-100">
              <PrimaryButton onClick={() => setStep(11)} className="w-full sm:w-auto px-8">
                Consultar Tablero Ejecutivo
              </PrimaryButton>
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-8">
            <div className="border-b border-slate-100 pb-5 mb-2 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Tablero de Seguimiento</h2>
                <p className="text-slate-500 text-sm mt-1">Supervisión del proceso de evaluación.</p>
              </div>
              <div className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg shadow-sm">
                <span className="font-mono text-slate-700 font-bold text-sm tracking-widest">ST2C-X8F</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="p-5 border-b border-slate-100 flex items-start gap-4">
                <div className="relative mt-1">
                  <div className="w-4 h-4 rounded-full bg-blue-500 relative z-10" />
                  <div className="w-4 h-4 rounded-full bg-blue-500 absolute top-0 left-0 animate-ping opacity-50" />
                  <div className="w-0.5 h-16 bg-slate-200 absolute top-4 left-[7px]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Estado: Revisión Documental en Sede</h3>
                  <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">Analistas de CODENOT examinan conformidad reglamentaria e indicios biométricos provistos en el formulario de origen.</p>
                  <p className="text-[11px] font-bold text-slate-400 mt-2 font-mono uppercase tracking-wider">Últ. act: HACE 2 MINUTOS</p>
                </div>
              </div>
              <div className="p-5 flex items-start gap-4 opacity-50">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 mt-1 bg-white" />
                <div>
                  <h3 className="text-base font-bold text-slate-700">Dictamen Final del Consejo</h3>
                  <p className="text-slate-500 text-sm mt-1">Adopción de decisión de oficio y habilitación de firma electrónica.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50/50 p-5 rounded-2xl border border-dotted border-slate-300">
              <p className="text-center text-[10px] text-slate-400 mb-4 font-bold uppercase tracking-widest leading-tight">Herramientas de pruebas - Rol Administrador</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => simulateLoading(() => setStep(121), 1200)}
                  className="px-5 py-2.5 bg-white border border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 rounded-xl shadow-sm transition-all text-sm font-semibold active:scale-[0.98]"
                >
                  Observar Expediente (Denegar)
                </button>
                <button
                  onClick={() => simulateLoading(() => setStep(122), 1200)}
                  className="px-5 py-2.5 bg-white border border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 rounded-xl shadow-sm transition-all text-sm font-semibold active:scale-[0.98]"
                >
                  Suscribir Aprobación (Firmar)
                </button>
              </div>
            </div>
          </div>
        );

      case 121:
        return (
          <div className="space-y-6 text-center py-6">
            <div className="w-16 h-16 mx-auto bg-red-50 rounded-2xl flex items-center justify-center mb-6 border border-red-100 shadow-sm">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Resolución Suspendida por Observaciones</h2>

            <div className="bg-white shadow-sm p-5 text-left border border-slate-200 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">Resolución Administrativa Externa</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                El proceso queda en receso procedimental dado que el domicilio manifestado discrepa frente al registro que impera en la Suprema Corte de Justicia.  Se requiere homologación de jurisdicción de domicilio.
              </p>
            </div>

            <div className="flex justify-center pt-6 border-t border-slate-100">
              <PrimaryButton onClick={() => setStep(5)}>Enmendar Solicitud y Recalificar</PrimaryButton>
            </div>
          </div>
        );

      case 122:
        return (
          <div className="space-y-6 text-center py-6">
            <div className="w-16 h-16 mx-auto bg-green-50 rounded-2xl flex items-center justify-center mb-6 border border-green-100 shadow-sm">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Expediente Oficializado</h2>

            <div className="bg-white shadow-sm p-5 border border-slate-200 rounded-2xl">
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
                El despacho evaluador ha concluido favorablemente y las prerrogativas digitales han sido instanciadas para su perfil notarial electrónico.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <PrimaryButton onClick={() => setStep(13)} className="bg-green-700 hover:bg-green-800 shadow-green-700/20">
                Pase a Enlace de Inicialización
              </PrimaryButton>
            </div>
          </div>
        );

      case 13:
        return (
          <div className="space-y-6 text-center py-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Onboarding Seguro</h2>
            <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
              El entorno notarial privado ya se halla configurado en las plataformas en la nube de la institución. Active sus certificados para conectarse por vez primera.
            </p>

            <div className="pt-8">
              <PrimaryButton onClick={() => setStep(14)} className="h-14 px-10 text-lg w-full sm:w-auto">
                Activar Tokens e Iniciar
              </PrimaryButton>
            </div>
          </div>
        );

      case 14:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8 border-b border-slate-100 pb-6">
              <div className="w-14 h-14 bg-[#0f3460] rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-[#0f3460]/20 mb-5 relative">
                <div className="absolute inset-0 bg-white/10 rounded-2xl border border-white/20"></div>
                <svg className="w-7 h-7 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Acceso Institucional</h2>
              <p className="text-slate-500 text-sm mt-1.5 font-medium">Autenticación Bifactorial Requerida.</p>
            </div>

            <div className="space-y-5">
              <div>
                <InputLabel>Identificador Oficial (Usuario / Cédula)</InputLabel>
                <InputField type="text" placeholder="Ej: 00100000001" />
              </div>
              <div>
                <InputLabel>Clave Criptográfica</InputLabel>
                <InputField type="password" placeholder="••••••••" />
              </div>
              <div className="pt-3">
                <InputLabel>Lectura TOTP (Dispositivo Vinculado)</InputLabel>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <input key={i} type="text" maxLength={1} className="w-full h-12 md:h-14 text-center text-xl font-bold rounded-xl border border-slate-200 text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f3460] focus:border-[#0f3460] shadow-sm transition-colors" />
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-semibold">Introduzca los 6 dígitos que proporciona su app certificada temporalmente.</p>
              </div>
            </div>

            <div className="pt-8">
              <PrimaryButton
                onClick={() => simulateLoading(() => setStep(15), 1800)}
                disabled={loading}
                className="w-full h-14 flex items-center justify-center gap-2 text-lg"
              >
                {loading && <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />}
                {loading ? "Desencriptando túnel..." : "Ingresar Plenamente"}
              </PrimaryButton>
            </div>

            <div className="text-center mt-6">
              <button onClick={handleRestart} className="text-sm font-semibold text-slate-400 hover:text-slate-700 transition-colors">Volver al Asistente Inicial</button>
            </div>
          </div>
        );

      case 15:
        return (
          <div className="space-y-8 text-center py-12">
            <div>
              <h1 className="text-3xl font-extrabold text-[#0f3460] tracking-tight">Despacho Virtual Operativo</h1>
              <p className="text-slate-600 font-medium mt-2">
                Suspensión de anonimato electrónico convalidada.
              </p>
            </div>
            <div className="w-24 h-24 mx-auto bg-slate-50 rounded-[2rem] flex items-center justify-center shadow-lg border border-slate-100 rotate-3 hover:rotate-0 transition-all duration-300">
              <svg className="w-12 h-12 text-[#0f3460]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="pt-10 w-full max-w-xs mx-auto">
              <SecondaryButton onClick={handleRestart} className="w-full">Desconectar Operador Central</SecondaryButton>
            </div>
          </div>
        );

      default:
        return <div className="p-4 text-red-700 bg-red-50 border border-red-200 rounded-xl font-medium">Estado interno violado.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-[#0f3460]/20">
      {/* Modern Header Nav */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 transition-all">
        {/* Flag colored thin top border */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-white to-red-600"></div>
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0f3460] rounded-xl flex items-center justify-center text-white font-serif font-bold italic shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <span className="relative z-10 text-lg">C</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-slate-800 leading-tight tracking-tight">Colegio Dominicano de Notarios</h1>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-0.5">Gestión Normativa y Expedientes Electrónicos</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-base font-bold text-slate-800 leading-tight">CODENOT</h1>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">En Línea</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[700px] mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-[2rem] p-6 sm:p-10 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 -z-10 -translate-y-1/2 translate-x-1/3"></div>

          {/* Active Step Content */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-20">
            {renderStep()}
          </div>

          {/* Refined Progress Bar */}
          {step > 1 && step < 15 && ![201, 301, 401, 121, 122].includes(step) && (
            <div className="mt-10 pt-8 border-t border-slate-100/80">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Procedimiento Integral</span>
                <span className="text-xs font-bold text-[#0f3460] bg-blue-50 px-2.5 py-1 rounded-md">
                  Pase {step > 2 ? Math.min(step - 1, 13) : 1} / 13
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#0f3460] to-[#2c538a] rounded-full transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{ width: `${(Math.min(step, 14) / 14) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Soft Footer */}
        <footer className="mt-12 text-center text-xs text-slate-400 pt-6 font-medium">
          Centro de Autorización · Gobierno Electrónico y Sociedad de la Información
        </footer>
      </main>
    </div>
  );
}
