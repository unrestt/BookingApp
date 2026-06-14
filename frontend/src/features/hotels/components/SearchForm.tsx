import { useState, useRef, useEffect } from "react";
import { BedDouble, Calendar as CalendarIcon, User, ChevronDown, Plus, Minus } from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import { pl } from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";
import { useHotels } from "../hooks/useHotels";
import toast from "react-hot-toast";

registerLocale("pl", pl);

const SearchForm = () => {

  const { data: hotels, isLoading, isError, error } = useHotels();

  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  const [guests, setGuests] = useState(2);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);

  // Stany dla autouzupełniania/sugestii
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Błąd pobierania produktów');
    }
  }, [isError, error]);

  // Filtrowanie unikalnych lokalizacji na podstawie wpisanej frazy
  useEffect(() => {
    if (!hotels) return;

    if (destination.trim() === "") {
      setSuggestions([]);
      return;
    }

    const uniqueLocations = Array.from(new Set(hotels.map((h) => h.location)));
    const filtered = uniqueLocations.filter((loc) =>
      loc.toLowerCase().includes(destination.toLowerCase())
    );
    setSuggestions(filtered);
  }, [destination, hotels]);

  // Zamykanie dropdownów kliknięciem na zewnątrz
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsGuestDropdownOpen(false);
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-neutral-950">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-neutral-800 border-t-white rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-white uppercase tracking-[0.3em] animate-pulse">
            ALDENARIS Loading
          </p>
        </div>
      </div>
    );
  }

  const handleSearch = () => {
    console.log("Wyszukiwanie:", { destination, startDate, endDate, guests });
    // TODO: przekierowanie z parametrami URL
  };

  return (
    <div className="bg-[#ffb700] p-1 rounded-lg flex flex-col md:flex-row gap-1 w-full max-w-6xl mx-auto shadow-lg relative">

      {/* Miejsce docelowe */}
      <div className="flex-1 flex items-center bg-white rounded-md px-3 py-3 gap-3 relative" ref={destinationRef}>
        <BedDouble className="text-gray-500 w-6 h-6" />
        <input
          type="text"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setIsSuggestionsOpen(true);
          }}
          onFocus={() => setIsSuggestionsOpen(true)}
          placeholder="Dokąd się wybierasz?"
          className="w-full focus:outline-none text-gray-900 placeholder-gray-500 font-medium"
        />

        {/* Lista podpowiedzi */}
        {isSuggestionsOpen && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-xl border border-gray-200 z-30 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setDestination(suggestion);
                  setIsSuggestionsOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-900 font-medium transition-colors border-b border-gray-100 last:border-b-0"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Daty */}
      <div className="flex-1 flex items-center bg-white rounded-md px-3 py-3 gap-3 cursor-pointer relative z-10">
        <CalendarIcon className="text-gray-500 w-6 h-6" />
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => setDateRange(update)}
          locale="pl"
          placeholderText="Zameldowanie — Wymeldowanie"
          className="w-full focus:outline-none text-gray-900 placeholder-gray-500 font-medium cursor-pointer"
          dateFormat="dd MMM"
          minDate={new Date()}
        />
      </div>

      {/* Goście i pokoje */}
      <div className="flex-1 relative" ref={dropdownRef}>
        <div
          className="flex items-center bg-white rounded-md px-3 py-3 gap-3 cursor-pointer justify-between h-full"
          onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <User className="text-gray-500 w-6 h-6 shrink-0" />
            <span className="text-gray-900 font-medium whitespace-nowrap overflow-hidden text-ellipsis select-none">
              {guests} {guests === 1 ? "osoba" : (guests < 5 ? "osoby" : "osób")}
            </span>
          </div>
          <ChevronDown className={`text-gray-500 w-5 h-5 shrink-0 transition-transform ${isGuestDropdownOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* Dropdown z gośćmi */}
        {isGuestDropdownOpen && (
          <div className="absolute top-full right-0 md:left-0 mt-2 bg-white rounded-md shadow-xl p-4 z-20 w-full min-w-[280px] border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Liczba osób</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-8 h-8 rounded-full border border-[#006ce4] text-[#006ce4] flex items-center justify-center hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
                  disabled={guests <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-medium text-gray-900 select-none">{guests}</span>
                <button
                  onClick={() => setGuests(guests + 1)}
                  className="w-8 h-8 rounded-full border border-[#006ce4] text-[#006ce4] flex items-center justify-center hover:bg-blue-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Przycisk Szukaj */}
      <button
        onClick={handleSearch}
        className="bg-[#006ce4] hover:bg-[#0057b8] text-white font-semibold text-xl px-8 py-3 rounded-md transition-colors"
      >
        Szukaj
      </button>

    </div>
  );
};

export default SearchForm;