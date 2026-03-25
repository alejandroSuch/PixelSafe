import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Container } from './components/layout/Container';
import { DropZone } from './components/dropzone/DropZone';
import { ImageList } from './components/images/ImageList';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { ResultsSummary } from './components/results/ResultsSummary';
import { GlobalDropOverlay } from './components/common/GlobalDropOverlay';
import { ConfirmDialog } from './components/common/ConfirmDialog';
import { useImages } from './context/ImageContext';
import { useImageProcessor } from './hooks/useImageProcessor';
import { useGlobalDrop } from './hooks/useGlobalDrop';
import { useBeforeUnload } from './hooks/useBeforeUnload';
import { downloadAllAsZip } from './services/download.service';
import { Button } from './components/ui/Button';

export default function App() {
  const { t } = useTranslation();
  const { images, dispatch } = useImages();
  const { isProcessing, process, cancel } = useImageProcessor();
  const { isGlobalDragging } = useGlobalDrop();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const hasImages = images.length > 0;
  const hasDone = images.some((img) => img.status === 'done');
  const pendingCount = images.filter((img) => img.status === 'pending').length;

  // Block tab close while processing or with undownloaded results
  useBeforeUnload(isProcessing || hasDone);

  const handleClear = () => {
    setShowClearConfirm(false);
    dispatch({ type: 'CLEAR' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {isGlobalDragging && <GlobalDropOverlay />}
      <Header />
      <main className="flex-1">
        <Container>
          <div className="space-y-6">
            <DropZone />

            {hasImages && (
              <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                <div className="space-y-6">
                  <ImageList />
                  {hasDone && <ResultsSummary />}
                </div>
                <div className="space-y-4">
                  <SettingsPanel />
                  <div className="space-y-2">
                    {isProcessing ? (
                      <Button variant="danger" onClick={cancel} className="w-full">
                        {t('actions.cancel')}
                      </Button>
                    ) : (
                      <Button onClick={process} disabled={pendingCount === 0} className="w-full">
                        {t('actions.optimize')} {pendingCount > 0 && `(${pendingCount})`}
                      </Button>
                    )}
                    {hasDone && (
                      <Button variant="secondary" onClick={() => downloadAllAsZip(images)} className="w-full">
                        {t('actions.downloadAll')}
                      </Button>
                    )}
                    <Button variant="danger" onClick={() => setShowClearConfirm(true)} className="w-full">
                      {t('actions.clear')}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </main>
      <Footer />

      <ConfirmDialog
        open={showClearConfirm}
        title={t('confirm.clearTitle')}
        message={t('confirm.clearMessage')}
        onConfirm={handleClear}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
}
