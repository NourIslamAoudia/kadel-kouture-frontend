import type { OrderItem } from "../types";
import { formatPrice, calculateTotalPrice } from "../../../common/pricing";

interface Props {
  items: OrderItem[];
  onAddItem: () => void;
  onEditItem: (index: number) => void;
  onRemoveItem: (index: number) => void;
}

export default function OrderItemsStep({
  items,
  onAddItem,
  onEditItem,
  onRemoveItem,
}: Props) {
  const totalPrice = calculateTotalPrice(items);

  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <span className="h-px w-[18px] bg-gold" />
        Récapitulatif des pièces
      </p>

      <h2 className="mb-2 font-serif text-3xl font-light leading-tight text-ink">
        Vos <em className="italic text-gold">commandes</em> ({items.length})
      </h2>

      <p className="mb-6 text-[13px] leading-relaxed text-ink-3">
        Vérifiez vos pièces sélectionnées ou ajoutez-en d'autres avant de passer
        aux mesures.
      </p>

      {/* Liste des pièces */}
      <div className="flex flex-col gap-3">
        {items.map((item, index) => {
          const garmentLabel =
            item.garment_type === "autre" && item.garment_type_other
              ? item.garment_type_other
              : capitalize(item.garment_type);

          const gPrice = item.garment_price;
          const wPrice = item.work_price;
          const pieceTotal = item.price;

          return (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-2xl border border-gold/20 bg-white p-4 shadow-sm transition hover:border-gold/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-pale text-xs font-semibold text-gold">
                    #{index + 1}
                  </span>

                  <div>
                    <h4 className="font-serif text-lg font-medium text-ink">
                      {garmentLabel}
                    </h4>

                    <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-ink-2">
                      <span className="rounded-md bg-gold-pale/60 px-1.5 py-0.5 text-[11px] font-medium text-ink">
                        Produit : {formatPrice(gPrice)}
                      </span>
                      <span>+</span>
                      <span className="rounded-md bg-gold-pale/60 px-1.5 py-0.5 text-[11px] font-medium capitalize text-ink">
                        {item.work_type} : {formatPrice(wPrice)}
                      </span>
                    </div>

                    {item.comment && (
                      <p className="mt-1.5 text-xs text-ink-3 italic">
                        « {item.comment} »
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-serif text-xl font-bold text-gold">
                    {formatPrice(pieceTotal)}
                  </span>
                  <span className="block text-[10px] text-ink-3">
                    {gPrice}€ + {wPrice}€
                  </span>
                </div>
              </div>

              {/* Actions pièce */}
              <div className="mt-3 flex items-center justify-end gap-3 border-t border-gold/10 pt-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => onEditItem(index)}
                  className="text-ink-3 transition hover:text-gold"
                >
                  Modifier
                </button>

                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveItem(index)}
                    className="text-red-500/80 transition hover:text-red-600"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bouton ajouter une autre pièce */}
      <button
        type="button"
        onClick={onAddItem}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gold/30 bg-gold-pale/30 py-3.5 text-sm font-medium text-gold transition hover:border-gold hover:bg-gold-pale/60"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-white text-xs font-bold leading-none">
          +
        </span>
        Ajouter un autre vêtement
      </button>

      {/* Bloc Total */}
      <div className="mt-6 rounded-2xl border border-gold/25 bg-gradient-to-r from-gold-pale/40 to-gold-pale/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-xs uppercase tracking-wider text-ink-3">
              Total estimé ({items.length}{" "}
              {items.length > 1 ? "pièces" : "pièce"})
            </span>
            <span className="text-[11px] text-ink-3/80">
              Tarif transparent selon la grille d'atelier
            </span>
          </div>
          <span className="font-serif text-2xl font-semibold text-ink">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}

function capitalize(s: string): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
