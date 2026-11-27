import React, { useState } from 'react';
import { useLanguage } from '@hooks/useLanguage';
import { profile } from '@data/profile';
import { Card, ExternalLink, ScrambleText } from '@components/ui';
import {
  EnvelopeSimple,
  InstagramLogo,
  Copy,
  Check,
  MapPin,
  Clock,
  Broadcast,
  ShieldCheck,
} from '@phosphor-icons/react';

export const ContactInfo: React.FC = () => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.socialLinks.email || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Node Status Terminal Card */}
      <Card glow className="space-y-4 border-border/80">
        <div className="flex items-center justify-between border-b border-border/60 pb-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="text-text-primary font-semibold">
              <ScrambleText text="FS_NODE // TRANSCEIVER" trigger="both" speed={20} />
            </span>
          </div>
          <span className="text-accent/90 bg-accent/10 px-2 py-0.5 rounded border border-accent/30 font-mono text-[10px]">
            ONLINE // STANDBY
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2.5 text-text-secondary">
            <MapPin size={16} className="text-accent shrink-0" />
            <span>
              {language === 'id' ? 'Lokasi Operasional:' : 'Operational Base:'}{' '}
              <strong className="text-text-primary font-semibold">
                Indonesia (UTC+7 / WIB)
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-text-secondary">
            <Clock size={16} className="text-accent shrink-0" />
            <span>
              {language === 'id' ? 'Estimasi Respons:' : 'Response SLA:'}{' '}
              <strong className="text-accent font-semibold">&lt; 24 Jam</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-text-secondary">
            <Broadcast size={16} className="text-accent shrink-0" />
            <span>
              {language === 'id' ? 'Status Ketersediaan:' : 'Availability:'}{' '}
              <span className="text-emerald-400 font-semibold">
                {language === 'id'
                  ? 'Terbuka untuk Peluang AI & Rekayasa Web'
                  : 'Open for AI & Software Engineering Roles'}
              </span>
            </span>
          </div>
        </div>
      </Card>

      {/* Direct Communication Channels */}
      <div className="space-y-3">
        <h3 className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
          <ScrambleText text={t.contact.socialProfiles} trigger="both" speed={18} />
        </h3>

        {/* Direct Email Channel */}
        <div className="p-4 rounded-xl bg-bg-surface/80 border border-border hover:border-accent/40 transition-all duration-200 group">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0 group-hover:scale-105 transition-transform">
                <EnvelopeSimple size={20} />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[11px] text-text-tertiary uppercase">
                  {t.contact.emailDirect}
                </p>
                <a
                  href={`mailto:${profile.socialLinks.email}`}
                  className="font-mono text-sm text-text-primary hover:text-accent font-semibold truncate block transition-colors"
                >
                  {profile.socialLinks.email}
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}
              className="p-2 rounded-lg bg-bg-overlay/60 hover:bg-accent/20 border border-border text-text-secondary hover:text-accent transition-all shrink-0 active:scale-95"
              title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
              {copied ? (
                <Check size={18} className="text-emerald-400 animate-in zoom-in" />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Instagram Verified Channel */}
        {profile.socialLinks.instagram && (
          <div className="p-4 rounded-xl bg-bg-surface/80 border border-border hover:border-accent/40 transition-all duration-200 group">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0 group-hover:scale-105 transition-transform">
                  <InstagramLogo size={20} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-text-tertiary uppercase">
                    Instagram Direct
                  </p>
                  <span className="font-mono text-sm text-text-primary font-semibold truncate block">
                    @fzrstria_
                  </span>
                </div>
              </div>

              <ExternalLink
                href={profile.socialLinks.instagram}
                aria-label="Visit Fajar Satria Instagram Profile"
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-bg-overlay/80 hover:bg-accent/20 border border-border text-text-secondary hover:text-accent font-semibold transition-all inline-flex items-center gap-1 shrink-0"
              >
                Follow →
              </ExternalLink>
            </div>
          </div>
        )}
      </div>

      {/* Verified Privacy & Security Tag */}
      <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary pt-2">
        <ShieldCheck size={16} className="text-accent/80 shrink-0" />
        <span>End-to-End Encrypted Communication Flow</span>
      </div>
    </div>
  );
};
